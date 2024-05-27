import axios from 'axios';
import dayjs from 'dayjs';
import { useLocalSearchParams } from 'expo-router';
import Form from '../../../components/schedule/Form';
import { useSession } from '../../../providers/SessionProvider';

export default function ScheduleScreen() {
  const { session } = useSession();
  const { selectedDate } = useLocalSearchParams();

  const defaultValues = {
    title: '',
    type: 'KELAS',
    isRecurring: true,
    day: new Date(selectedDate),
    start: '',
    end: '',
  };

  const handleSubmit = async (data) => {
    const postUri = `${process.env.EXPO_PUBLIC_BASE_URL}/schedule`;
    const { data: response } = await axios.post(postUri, data, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    // console.log(response);
  };

  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
}
