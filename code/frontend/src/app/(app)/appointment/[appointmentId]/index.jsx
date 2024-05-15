import axios from 'axios';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import AppointmentDetailsHeaderRight from '../../../../components/appointment/AppointmentDetailsHeaderRight';
import AppointmentDetailsText from '../../../../components/appointment/AppointmentDetailsText';
import AppointmentStatusChip from '../../../../components/appointment/AppointmentStatusChip';
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
    startDateTime: new Date(),
    endDateTime: new Date(),
    createdAt: new Date(),
    updateAt: new Date(),
  });
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    getAppointDetails();
  }, []);

  const navigation = useNavigation();
  const userId = getUserId();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return organizer.id !== userId ? (
          <AppointmentDetailsHeaderRight />
        ) : null;
      },
    });
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, padding: 32 }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  const {
    date,
    status,
    topic,
    organizer,
    participant,
    startDateTime,
    endDateTime,
  } = appointment;
  return (
    <View style={[styles.screen]}>
      <Text
        variant='headlineLarge'
        style={styles.topic}
      >
        {topic}
      </Text>
      <AppointmentStatusChip data={status} />
      <AppointmentDetailsText
        title='Organizer'
        body={organizer.name}
      />
      <AppointmentDetailsText
        title='Participant'
        body={participant.name}
      />
      <AppointmentDetailsText
        title='Time'
        body={getTimeDuration(startDateTime, endDateTime)}
      />
      <AppointmentDetailsText
        title='Place'
        body='John Dow'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    rowGap: 32,
  },
  debug: {
    borderWidth: 1,
    borderColor: 'red',
  },
});
