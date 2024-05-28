import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import { ActivityIndicator, Text } from 'react-native-paper';
import { FormError, useFormError } from '../../../../components/FormError';
import {
  FormLoading,
  useFormLoading,
} from '../../../../components/FormLoading';
import Form from '../../../../components/schedule/Form';
import { useSession } from '../../../../providers/SessionProvider';

export default function ScheduleEditScreen() {
  const { scheduleId } = useLocalSearchParams();
  const { session } = useSession();

  const [defaultValues, setDefaultValues] = useState({
    title: 'aa',
    type: 'KELAS',
    isRecurring: true,
    day: new Date(),
    start: '',
    end: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const {
    visible: formLoadingVisible,
    showDialog: formLoadingShow,
    hideDialog: formLoadingHide,
    goBack,
  } = useFormLoading();
  const {
    visible: formErrorVisible,
    showDialog: formErrorShow,
    hideDialog: formErrorHide,
    message,
    setMessage,
  } = useFormError();

  const getScheduleDetails = async () => {
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/schedule/${scheduleId}`;

    try {
      setIsLoading(true);
      const { data } = await axios.get(getUri, {
        headers: { Authorization: `Bearer ${session}` },
      });

      data.day = data.start;
      setDefaultValues(data);
      // console.log(defaultValues);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching schedule details: ', error);
    }
  };

  const handleSubmit = async (data) => {
    // console.log(data);

    const patchUri = `${process.env.EXPO_PUBLIC_BASE_URL}/schedule/${scheduleId}`;
    formLoadingShow();
    try {
      const { data: response } = await axios.patch(patchUri, data, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });

      // console.log(response);

      formLoadingHide();
      goBack();
    } catch (error) {
      // console.error('Error patching schedule: ', error);

      formLoadingHide();
      setMessage(error.response.data);
      formErrorShow();
    }
  };

  useEffect(() => {
    getScheduleDetails();
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

      <FormLoading visible={formLoadingVisible} />
      <FormError
        visible={formErrorVisible}
        message={message}
        hideDialog={formErrorHide}
      />
    </>
  );
}
