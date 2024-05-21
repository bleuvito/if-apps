import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import { ActivityIndicator, Text } from 'react-native-paper';
import Form from '../../../../../../components/schedule/Form';
import { useSession } from '../../../../../../providers/SessionProvider';

export default function ScheduleEditScreen() {
  const { roomId, roomScheduleId } = useLocalSearchParams();
  const { session } = useSession();

  const [defaultValues, setDefaultValues] = useState({
    title: '',
    type: 'KELAS',
    isRecurring: true,
    day: new Date(),
    start: '',
    end: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const getScheduleDetails = async () => {
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/room-schedule/${roomId}/schedule/${roomScheduleId}`;

    try {
      setIsLoading(true);
      const { data } = await axios.get(getUri, {
        headers: { Authorization: `Bearer ${session}` },
      });

      data.day = data.start;
      setDefaultValues(data);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching schedule details: ', error);
    }
  };

  const handleSubmit = async (data) => {
    const patchUri = `${process.env.EXPO_PUBLIC_BASE_URL}/room-schedule/${roomId}/schedule/${roomScheduleId}`;
    try {
      const { data: response } = await axios.patch(patchUri, data, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
    } catch (error) {
      console.error('Error patching schedule: ', error);
    }
  };

  useEffect(() => {
    getScheduleDetails();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size='large' />;
  }

  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
}
