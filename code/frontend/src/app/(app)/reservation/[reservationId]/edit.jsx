import axios from 'axios';
import dayjs from 'dayjs';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { FormError, useFormError } from '../../../../components/FormError';
import {
  FormLoading,
  useFormLoading,
} from '../../../../components/FormLoading';
import Form from '../../../../components/reservation/ReservationForm';
import { useSession } from '../../../../providers/SessionProvider';

export default function ReservasionEditScreen() {
  const { session } = useSession();
  const { reservationId } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState({
    title: '',
    date: new Date(),
    start: '',
    end: '',
    room: {
      id: '',
      name: '',
      capacity: '',
    },
  });
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

  const getReservasionDetails = async () => {
    setIsLoading(true);

    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/reservation/${reservationId}`;
    try {
      const { data } = await axios.get(getUri, {
        headers: { Authorization: `Bearer ${session}` },
      });

      data.date = dayjs(data.start);
      setDefaultValues(data);
    } catch (error) {
      console.error('Error fetching reservation: ', error);
    }

    setIsLoading(false);
  };

  const handleSubmit = async (data) => {
    const patchUri = `${process.env.EXPO_PUBLIC_BASE_URL}/reservation/${reservationId}`;
    formLoadingShow();

    try {
      const { data: response } = await axios.patch(patchUri, data, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
      formLoadingHide();
      goBack();
    } catch (error) {
      formLoadingHide();
      setMessage(error.response.data);
      formErrorShow();
      // console.error('Error creating appointment', error);
    }
  };

  useEffect(() => {
    getReservasionDetails();
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
