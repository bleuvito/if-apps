import axios from 'axios';
import dayjs from 'dayjs';
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router';
import { useCallback, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  Text,
} from 'react-native-paper';
import ReservationDetailsHeaderRight from '../../../../components/reservation/HeaderRight';
import ReservationDetailsText from '../../../../components/reservation/ReservationDetailsText';
import { useSession } from '../../../../providers/SessionProvider';

export default function ReservationDetailsScreen() {
  const { session, getRole, getUserId } = useSession();
  const { reservationId } = useLocalSearchParams();
  const navigation = useNavigation();

  const [reservation, setReservation] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    room: {
      id: '',
      name: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const role = getRole();
  const userId = getUserId();

  const getReservasion = async () => {
    setIsLoading(true);

    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/reservation/${reservationId}`;
    try {
      const { data } = await axios.get(getUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });

      setReservation(data);
    } catch (error) {
      console.error('Error fetching reservasion: ', error);
    }

    setIsLoading(false);
  };

  function showDialog() {
    setVisible(true);
  }

  function hideDialog() {
    setVisible(false);
  }

  const handleDeleteReservation = async () => {
    const deleteUri = `${process.env.EXPO_PUBLIC_BASE_URL}/reservation/${reservationId}`;

    try {
      const { data: deletedReservation } = await axios.delete(deleteUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });

      console.log(deletedReservation);
    } catch (error) {
      console.error('Error deleting reservation: ', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getReservasion();
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return reservation?.reserveeId === userId ||
          ['ADMIN', 'KAJUR', 'KALAB'].includes(role) ? (
          <ReservationDetailsHeaderRight onPressDelete={showDialog} />
        ) : null;
      },
    });
  }, [navigation]);

  if (isLoading) {
    return <ActivityIndicator size='large' />;
  }

  return (
    <View>
      <Text variant='headlineLarge'>{reservation.title}</Text>
      <ReservationDetailsText
        title={'Date'}
        body={dayjs(reservation.start).format('dddd, DD MMMM YYYY')}
      />
      <ReservationDetailsText
        title={'Time'}
        body={`${dayjs(reservation.start).format('HH:mm')}-${dayjs(
          reservation.end
        ).format('HH:mm')}`}
      />
      <ReservationDetailsText
        title={'Place'}
        body={reservation.room.name}
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>Delete reservation?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
          <Dialog.Actions>
            <Button onPress={handleDeleteReservation}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    rowGap: 32,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
  },
  debug: {
    borderWidth: 1,
    borderColor: 'red',
  },
});
