import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FormError, useFormError } from '../../../../components/FormError';
import {
  FormLoading,
  useFormLoading,
} from '../../../../components/FormLoading';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import AppointmentForm from '../../../../components/appointment/AppointmentForm';
import { useSession } from '../../../../providers/SessionProvider';

export default function AppointmentEdit() {
  const { appointmentId } = useLocalSearchParams();
  const { session } = useSession();
  const [defaultValues, setDefaultValues] = useState({
    topic: '',
    date: new Date(),
    start: new Date(),
    end: new Date(),
    place: '',
    link: '',
    participant: {},
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

  const getAppointmentDetails = async () => {
    setIsLoading(true);

    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/appointment/${appointmentId}`;
    const { data } = await axios.get(getUri, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    setDefaultValues({
      ...data,
      date: new Date(data.start),
      start: new Date(data.start),
      end: new Date(data.end),
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getAppointmentDetails();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const handleSubmit = async (data) => {
    const putUri = `${process.env.EXPO_PUBLIC_BASE_URL}/appointment/${appointmentId}`;

    formLoadingShow();
    try {
      const { data: response } = await axios.put(putUri, data, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });

      formLoadingHide();
      goBack();
    } catch (error) {
      console.error('Error editing tag: ', error);
      formLoadingHide();
      setMessage(error.response.data);
      formErrorShow();
    }
  };

  return (
    <>
      <AppointmentForm
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
