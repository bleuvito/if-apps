import axios from 'axios';
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router';
import { useCallback, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import DetailsText from '../../../../components/room/DetailsText';
import HeaderRight from '../../../../components/room/HeaderRight';
import { useSession } from '../../../../providers/SessionProvider';

export default function ScheduleDetailsScreen() {
  const { roomId } = useLocalSearchParams();
  const { session, getRole } = useSession();
  const navigation = useNavigation();

  const [room, setRoom] = useState({
    name: '',
    capacity: '',
    description: '',
  });
  const [visible, setVisible] = useState(false);

  const userRole = getRole();
  const canEdit =
    userRole === 'ADMIN' || userRole === 'KAJUR' || userRole === 'KALAB';

  const getRoom = async () => {
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/room/${roomId}`;
    try {
      const { data } = await axios.get(getUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });

      setRoom(data);
    } catch (error) {
      console.error('Error getting room', error);
    }
  };

  function showDialog() {
    setVisible(true);
  }

  function hideDialog() {
    setVisible(false);
  }

  const handleDeleteRoom = async () => {
    const deleteUri = `${process.env.EXPO_PUBLIC_BASE_URL}/room/${roomId}`;
    try {
      const { data } = await axios.delete(deleteUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
    } catch (error) {
      console.error('Error deleting room: ', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getRoom();
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return canEdit && <HeaderRight onPressDelete={showDialog} />;
      },
    });
  }, [navigation]);

  return (
    <View style={[styles.screen]}>
      <Text
        variant='headlineLarge'
        style={styles.headline}
      >
        {room.name}
      </Text>
      <DetailsText
        title='Capacity'
        body={`${room.capacity} orang`}
      />
      <DetailsText
        title='Description'
        body={room.description}
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>Delete room?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
          <Dialog.Actions>
            <Button onPress={handleDeleteRoom}>Delete</Button>
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
    rowGap: 16,
  },
  headline: {
    marginBottom: 8,
  },
  debug: {
    borderWidth: 1,
    borderColor: 'red',
  },
});
