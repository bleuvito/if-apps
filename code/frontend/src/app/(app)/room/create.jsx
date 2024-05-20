import axios from 'axios';
import { Text } from 'react-native-paper';
import RoomForm from '../../../components/room/Form';
import { useSession } from '../../../providers/SessionProvider';

export default function RoomCreateScreen() {
  const { session } = useSession();

  const defaultValues = {
    name: '',
    capacity: '0',
    description: '',
  };

  const handleSubmit = async (data) => {
    const postUri = `${process.env.EXPO_PUBLIC_BASE_URL}/room`;
    try {
      const { data: response } = await axios.post(postUri, data, {
        headers: { Authorization: `Bearer ${session}` },
      });
    } catch (error) {
      console.error('Error creating room: ', error);
    }
  };

  return (
    <RoomForm
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
}
