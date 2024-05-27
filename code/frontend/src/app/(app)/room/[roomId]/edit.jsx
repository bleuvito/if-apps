import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native-paper';
import {
  FormLoading,
  useFormLoading,
} from '../../../../components/FormLoading';
import Form from '../../../../components/room/Form';
import { useSession } from '../../../../providers/SessionProvider';

export default function RoomEditScreen() {
  const { roomId } = useLocalSearchParams();
  const { session } = useSession();

  const [defaultValues, setDefaultValues] = useState({
    name: '',
    capacity: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { visible, hideDialog, showDialog, goBack } = useFormLoading();

  const getRoomDetails = async () => {
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/room/${roomId}`;

    try {
      setIsLoading(true);

      const { data } = await axios.get(getUri, {
        headers: { Authorization: `Bearer ${session}` },
      });

      data.capacity = data.capacity.toString();
      setDefaultValues(data);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching room details: ', error);
    }
  };

  const handleSubmit = async (data) => {
    const patchUri = `${process.env.EXPO_PUBLIC_BASE_URL}/room/${roomId}`;

    showDialog();
    try {
      const { data: response } = await axios.patch(patchUri, data, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
    } catch (error) {
      console.error('Error patching room: ', error);
    } finally {
      hideDialog();
      goBack();
    }
  };

  useEffect(() => {
    getRoomDetails();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size='large' />;
  }

  return (
    <>
      <Form
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
      />
      <FormLoading visible={visible} />
    </>
  );
}
