import axios from 'axios';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native-paper';
import {
  FormLoading,
  useFormLoading,
} from '../../../../components/FormLoading';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import Form from '../../../../components/tag/TagForm';
import { useSession } from '../../../../providers/SessionProvider';

export default function EditTagDetailsScreen() {
  const { tagId } = useLocalSearchParams();
  const { session } = useSession();
  const { visible, hideDialog, showDialog, goBack } = useFormLoading();

  const [defaultValues, setDefaultValues] = useState({
    id: '',
    authorId: '',
    name: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const getTagDetails = async () => {
    try {
      setIsLoading(true);

      const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/tag/${tagId}`;
      const { data } = await axios.get(getUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
      setDefaultValues(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error getting tag details: ', error);
    }
  };

  const handleSubmit = async (data) => {
    const patchUri = `${process.env.EXPO_PUBLIC_BASE_URL}/tag/${tagId}`;
    showDialog();
    try {
      const { data: response } = await axios.patch(patchUri, data, {
        headers: { Authorization: `Bearer ${session}` },
      });
    } catch (error) {
      console.error('Error creating tag', error);
    } finally {
      hideDialog();
      goBack();
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTagDetails();
    }, [])
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      />
      <FormLoading visible={visible} />
    </>
  );
}
