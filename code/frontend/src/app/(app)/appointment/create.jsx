import axios from 'axios';
import AppointmentForm from '../../../components/appointment/AppointmentForm';
import { useSession } from '../../../providers/SessionProvider';

export default function AppointmentCreate() {
  const { session } = useSession();
  const defaultValues = {
    topic: '',
    date: '',
    startDateTime: '',
    endDateTime: '',
    participant: {},
  };

  const handleSubmit = async (data) => {
    const postUri = `${process.env.EXPO_PUBLIC_BASE_URL}/appointment`;
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
    <AppointmentForm
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
}
