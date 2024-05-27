import axios from 'axios';
import { Text } from 'react-native-paper';
import { FormLoading, useFormLoading } from '../../../components/FormLoading';
import RoomForm from '../../../components/room/Form';
import { useSession } from '../../../providers/SessionProvider';

export default function RoomCreateScreen() {
  const { session } = useSession();
  const { visible, goBack, hideDialog, showDialog } = useFormLoading();

  const defaultValues = {
    name: '',
    capacity: '0',
    description: '',
  };

  const handleSubmit = async (data) => {
    const postUri = `${process.env.EXPO_PUBLIC_BASE_URL}/room`;

    showDialog();
    try {
      const { data: response } = await axios.post(postUri, data, {
        headers: { Authorization: `Bearer ${session}` },
      });
    } catch (error) {
      console.error('Error creating room: ', error);
    } finally {
      hideDialog();
      goBack();
    }
  };

  return (
    <>
      <RoomForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
      />
      <FormLoading visible={visible} />
    </>
  );
}
