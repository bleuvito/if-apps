import axios from 'axios';
import dayjs from 'dayjs';
import { useLocalSearchParams } from 'expo-router';
import Form from '../../../../../components/schedule/Form';
import { useSession } from '../../../../../providers/SessionProvider';

export default function ScheduleScreen() {
  const { session } = useSession();
  const { roomId } = useLocalSearchParams();
  const { selectedDate } = useLocalSearchParams();

  const defaultValues = {
    title: '',
    type: 'KELAS',
    isRecurring: true,
    day: selectedDate,
    start: '',
    end: '',
  };

  const handleSubmit = async (data) => {
    const postUri = `${process.env.EXPO_PUBLIC_BASE_URL}/room-schedule/${roomId}`;

    try {
      const { data: response } = await axios.post(postUri, data, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });

      console.log(response);
    } catch (error) {
      console.error('Error creating room schedule: ', error);
    }
  };

  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
}
