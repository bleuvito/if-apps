import axios from 'axios';
import dayjs from 'dayjs';
import { FormError, useFormError } from '../../../components/FormError';
import { FormLoading, useFormLoading } from '../../../components/FormLoading';
import Form from '../../../components/reservation/Form';
import { useSession } from '../../../providers/SessionProvider';

export default function ReservationCreateScreen() {
  const { session } = useSession();
  const defaultValues = {
    title: '',
    date: new Date(),
    start: '',
    end: '',
    room: {},
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
    const postUri = `${process.env.EXPO_PUBLIC_BASE_URL}/reservation`;
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
      // console.error('Error creating appointment', error);
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
