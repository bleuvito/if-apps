import axios from 'axios';

import { FormError, useFormError } from '../../../components/FormError';
import { FormLoading, useFormLoading } from '../../../components/FormLoading';
import ReservationForm from '../../../components/reservation/ReservationForm';
import { useSession } from '../../../providers/SessionProvider';

export default function ReservationCreateScreen() {
  const defaultValues = {
    title: '',
    date: new Date(),
    start: '',
    end: '',
    room: {},
  };

  const { session } = useSession();
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
      console.error('Error creating reservation', error);
      formLoadingHide();
      setMessage(error.response.data);
      formErrorShow();
    }
  };

  return (
    <>
      <ReservationForm
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
