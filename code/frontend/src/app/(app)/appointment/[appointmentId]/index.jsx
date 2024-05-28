import axios from 'axios';
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  Text,
} from 'react-native-paper';

import { A } from '@expo/html-elements';
import {
  FormLoading,
  useFormLoading,
} from '../../../../components/FormLoading';
import AppointmentResponseButton from '../../../../components/appointment/BottomButtons';
import AppointmentDetailsHeaderRight from '../../../../components/appointment/HeaderRight';
import AppointmentStatusChip from '../../../../components/appointment/StatusChip';
import AppointmentDetailsText from '../../../../components/appointment/Text';
import { getTimeDuration } from '../../../../helpers/utils';
import { useSession } from '../../../../providers/SessionProvider';

export default function AppointmentDetailsScreen() {
  const { session, getUserId } = useSession();
  const { appointmentId } = useLocalSearchParams();
  const [appointment, setAppointment] = useState({
    date: '',
    status: '',
    topic: '',
    organizer: {
      name: '',
    },
    participant: {
      name: '',
    },
    start: new Date(),
    end: new Date(),
    place: '',
    link: '',
    createdAt: new Date(),
    updateAt: new Date(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const userId = getUserId();

  const {
    visible: formLoadingVisible,
    showDialog: formLoadingShow,
    hideDialog: formLoadingHide,
    goBack,
  } = useFormLoading();

  const getAppointDetails = async () => {
    setIsLoading(true);

    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/appointment/${appointmentId}`;

    try {
      const { data } = await axios.get(getUri, {
        headers: { Authorization: `Bearer ${session}` },
      });

      setAppointment(data);
    } catch (error) {
      console.error('Error getting appointment details: ', error);
    }

    setIsLoading(false);
  };

  function showDialog() {
    setVisible(true);
  }

  function hideDialog() {
    setVisible(false);
  }

  const handleDeleteAppointment = async () => {
    const deleteUri = `${process.env.EXPO_PUBLIC_BASE_URL}/appointment/${appointmentId}`;

    formLoadingShow();
    try {
      const { data: deletedAppointment } = await axios.delete(deleteUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });

      // console.log(deletedAppointment);
    } catch (error) {
      console.error('Error deleting appointment: ', error);
      formLoadingHide();
      goBack();
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return appointment?.organizer.id === userId ? (
          <AppointmentDetailsHeaderRight
            onPressDelete={showDialog}
            status={appointment?.status}
          />
        ) : null;
      },
    });
  }, [navigation, appointment]);

  useFocusEffect(
    useCallback(() => {
      getAppointDetails();
    }, [])
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, padding: 32 }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <View style={[styles.screen]}>
      <View>
        <View style={{ flexDirection: 'row-reverse', paddingLeft: 16 }}>
          <AppointmentStatusChip data={appointment?.status} />
        </View>
        <Text
          variant='headlineLarge'
          style={styles.topic}
        >
          {appointment?.topic}
        </Text>
      </View>
      <AppointmentDetailsText
        title='Penyelenggara'
        body={appointment?.organizer.name}
      />
      <AppointmentDetailsText
        title='Partisipan'
        body={appointment?.participant.name}
      />
      <AppointmentDetailsText
        title='Waktu'
        body={getTimeDuration(appointment?.start, appointment?.end)}
      />
      <AppointmentDetailsText
        title='Tempat'
        body={appointment?.place}
      />
      {appointment?.link.length > 0 && (
        <View>
          <Text variant='bodyLarge'>Tautan</Text>
          <A
            href='http://google.com'
            target='_blank'
            style={{ fontSize: 24, textDecorationLine: 'underline' }}
          >
            google.com
          </A>
        </View>
      )}
      {(appointment?.status === 'DECLINED' ||
        appointment?.status === 'RESCHEDULE') && (
        <View>
          <Text
            variant='bodyLarge'
            style={{ color: 'red', fontWeight: 'bold' }}
          >
            Alasan Penolakan
          </Text>
          <Text variant='titleLarge'>{appointment?.declineReason}</Text>
        </View>
      )}
      <AppointmentResponseButton
        status={appointment?.status}
        organizerId={appointment?.organizer.id}
        userId={userId}
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>Hapus janji temu?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Batal</Button>
            <Button onPress={handleDeleteAppointment}>Hapus</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <FormLoading visible={formLoadingVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    rowGap: 16,
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
