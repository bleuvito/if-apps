import axios from 'axios';
import { FormError, useFormError } from '../../../components/FormError';
import { FormLoading, useFormLoading } from '../../../components/FormLoading';
import AppointmentForm from '../../../components/appointment/Form';
import { useSession } from '../../../providers/SessionProvider';

export default function AppointmentCreate() {
  const { session } = useSession();
  const defaultValues = {
    topic: '',
    date: new Date(),
    start: '',
    end: '',
    place: '',
    link: '',
    participant: {},
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
    const postUri = `${process.env.EXPO_PUBLIC_BASE_URL}/appointment`;

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
