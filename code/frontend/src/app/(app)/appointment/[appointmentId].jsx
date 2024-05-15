import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import AppointmentDetailsText from '../../../components/appointment/AppointmentDetailsText';
import { getTimeDuration } from '../../../helpers/utils';
import { useSession } from '../../../providers/SessionProvider';

export default function AppointmentDetailsScreen() {
  const { session } = useSession();
  const { appointmentId } = useLocalSearchParams();
  const [appointment, setAppointment] = useState({});
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
    const appointment = getAppointDetails();
    setAppointment(appointment);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, padding: 32 }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  const { date, topic, organizer, participant, startTime, endTime } =
    appointment;

  return (
    <View style={[styles.screen, styles.debug]}>
      <Text
        variant='headlineLarge'
        style={styles.topic}
      >
        {topic}
      </Text>
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
        body={getTimeDuration(startTime, endTime)}
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
