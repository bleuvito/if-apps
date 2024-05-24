import axios from 'axios';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native-paper';
import Form from '../../../../components/tag/Form';
import { useSession } from '../../../../providers/SessionProvider';

export default function EditTagDetailsScreen() {
  const { tagId } = useLocalSearchParams();
  const { session } = useSession();

  const [defaultValues, setDefaultValues] = useState({
    id: '',
    authorId: '',
    name: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const getTagDetails = async () => {
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/tag/${tagId}`;

    setIsLoading(true);
    try {
      const { data } = await axios.get(getUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });

      setDefaultValues(data);
    } catch (error) {
      console.log('Error getting tag details: ', error);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (data) => {
    const patchUri = `${process.env.EXPO_PUBLIC_BASE_URL}/tag/${tagId}`;
    try {
      const { data: response } = await axios.patch(patchUri, data, {
        headers: { Authorization: `Bearer ${session}` },
      });
    } catch (error) {
      console.error('Error creating tag', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTagDetails();
    }, [])
  );

  if (isLoading) {
    return <ActivityIndicator size='large' />;
  }

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
    />
  );
}
