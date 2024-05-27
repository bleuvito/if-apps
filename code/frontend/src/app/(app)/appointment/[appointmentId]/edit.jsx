import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native-paper';
import { id } from 'react-native-paper-dates';
import AppointmentForm from '../../../../components/appointment/Form';
import { useSession } from '../../../../providers/SessionProvider';

export default function AppointmentEdit() {
  const { appointmentId } = useLocalSearchParams();
  const { session } = useSession();
  const [defaultValues, setDefaultValues] = useState({
    topic: '',
    date: new Date(),
    start: new Date(),
    end: new Date(),
    place: '',
    link: '',
    participant: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const getAppointmentDetails = async () => {
    setIsLoading(true);

    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/appointment/${appointmentId}`;
    const { data } = await axios.get(getUri, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    setDefaultValues({
      ...data,
      date: new Date(data.start),
      start: new Date(data.start),
      end: new Date(data.end),
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getAppointmentDetails();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size='large' />;
  }

  const handleSubmit = async (data) => {
    console.log(data);
    const putUri = `${process.env.EXPO_PUBLIC_BASE_URL}/appointment/${appointmentId}`;
    try {
      const { data: response } = await axios.put(putUri, data, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });

      console.log(response);
    } catch (error) {
      console.error('Error creating appointment', error);
    }
  };

  return (
    <AppointmentForm
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
}
