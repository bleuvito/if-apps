import axios from 'axios';
import dayjs from 'dayjs';
import Form from '../../../components/reservation/Form';
import { useSession } from '../../../providers/SessionProvider';

export default function ReservationCreateScreen() {
  const { session } = useSession();
  const defaultValues = {
    title: '',
    date: new Date(),
    start: '',
    end: '',
    room: {},
  };

  const handleSubmit = async (data) => {
    const postUri = `${process.env.EXPO_PUBLIC_BASE_URL}/reservation`;
    try {
      const { data: response } = await axios.post(postUri, data, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
    } catch (error) {
      console.error('Error creating appointment', error);
    }
  };

  return (
    <Form
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
}
