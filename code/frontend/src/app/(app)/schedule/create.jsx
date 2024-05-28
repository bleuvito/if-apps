import axios from 'axios';
import dayjs from 'dayjs';
import { useLocalSearchParams } from 'expo-router';
import { FormError, useFormError } from '../../../components/FormError';
import { FormLoading, useFormLoading } from '../../../components/FormLoading';
import Form from '../../../components/schedule/Form';
import { useSession } from '../../../providers/SessionProvider';

export default function ScheduleScreen() {
  const { session } = useSession();
  const { selectedDate } = useLocalSearchParams();

  const defaultValues = {
    title: '',
    type: 'KELAS',
    isRecurring: true,
    day: new Date(selectedDate),
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
    const postUri = `${process.env.EXPO_PUBLIC_BASE_URL}/schedule`;

    formLoadingShow();
    try {
      const { data: response } = await axios.post(postUri, data, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
      // console.log(response);

      formLoadingHide();
      goBack();
    } catch (error) {
      formLoadingHide();
      setMessage(error.response.data);
      formErrorShow();
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
