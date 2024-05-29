import axios from 'axios';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native-paper';
import {
  FormLoading,
  useFormLoading,
} from '../../../../components/FormLoading';
import Form from '../../../../components/user/Form';
import { useSession } from '../../../../providers/SessionProvider';

export default function EditUserDetailsScreen() {
  const { userId } = useLocalSearchParams();
  const { session } = useSession();

  const [defaultValues, setDefaultValues] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const {
    visible: formLoadingVisible,
    showDialog: formLoadingShow,
    hideDialog: formLoadingHide,
    goBack,
  } = useFormLoading();

  const getUserDetails = async () => {
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/user/${userId}`;

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
    const patchUri = `${process.env.EXPO_PUBLIC_BASE_URL}/user/${userId}`;
    try {
      formLoadingShow();
      const { data: response } = await axios.patch(patchUri, data, {
        headers: { Authorization: `Bearer ${session}` },
      });
    } catch (error) {
      // console.error('Error creating tag', error);
    } finally {
      formLoadingHide();
      goBack();
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserDetails();
    }, [])
  );

  if (isLoading) {
    return <ActivityIndicator size='large' />;
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      />

      <FormLoading visible={formLoadingVisible} />
    </>
  );
}
