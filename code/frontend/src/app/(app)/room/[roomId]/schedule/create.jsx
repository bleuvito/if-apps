import axios from 'axios';
import dayjs from 'dayjs';
import { useLocalSearchParams } from 'expo-router';
import { FormError, useFormError } from '../../../../../components/FormError';
import {
  FormLoading,
  useFormLoading,
} from '../../../../../components/FormLoading';
import Form from '../../../../../components/schedule/Form';
import { useSession } from '../../../../../providers/SessionProvider';

export default function ScheduleScreen() {
  const { session } = useSession();
  const { roomId } = useLocalSearchParams();
  const { selectedDate } = useLocalSearchParams();

  const defaultValues = {
    title: '',
    type: 'KELAS',
    isRecurring: true,
    day: selectedDate,
    start: '',
    end: '',
  };
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

  const handleSubmit = async (data) => {
    const postUri = `${process.env.EXPO_PUBLIC_BASE_URL}/room-schedule/${roomId}`;
    formLoadingShow();
    try {
      const { data: response } = await axios.post(postUri, data, {
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
      console.error('Error creating room schedule: ', error);
    }
  };

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
