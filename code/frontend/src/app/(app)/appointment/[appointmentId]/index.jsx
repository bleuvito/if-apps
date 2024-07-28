import { A } from '@expo/html-elements';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router';
import { useCallback, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import LoadingIndicator from '../../../../components/LoadingIndicator';
import StatusChip from '../../../../components/StatusChip';
// import AppointmentDetailsHeaderRight from '../../../../components/appointment/AppointmentDetailsHeaderRight';
import AppointmentDetailsHeaderRight from '../../../../components/appointment/AppointmentDetailsHeaderRight';
import AppointmentDetailsText from '../../../../components/appointment/AppointmentDetailsText';
import ResponseButtons from '../../../../components/appointment/ResponseButtons';
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
  const navigation = useNavigation();
  const userId = getUserId();

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return appointment?.organizer.id === userId ? (
          <AppointmentDetailsHeaderRight status={appointment.status} />
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
    return <LoadingIndicator />;
  }

  return (
    <View style={[styles.screen]}>
      <View>
        <View style={{ flexDirection: 'row-reverse', paddingLeft: 16 }}>
          <StatusChip data={appointment?.status} />
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
        title='Hari, Tanggal'
        body={dayjs(appointment?.start)
          .locale('id')
          .format('dddd, DD MMMM YYYY')}
      />
      <AppointmentDetailsText
        title='Waktu'
        body={getTimeDuration(appointment?.start, appointment?.end)}
      />
      <AppointmentDetailsText
        title='Tempat'
        body={appointment?.place}
      />
      {appointment?.link?.length > 0 && (
        <View>
          <Text variant='bodyLarge'>Tautan</Text>
          <A
            href={appointment.link}
            target='_blank'
            style={{ fontSize: 24, textDecorationLine: 'underline' }}
          >
            {appointment.link}
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
      <ResponseButtons
        status={appointment?.status}
        organizerId={appointment?.organizer.id}
        userId={userId}
      />
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
