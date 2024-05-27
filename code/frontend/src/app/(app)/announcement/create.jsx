import axios from 'axios';

// import { View } from 'react-native-reanimated/lib/typescript/Animated';
import { View } from 'react-native';
import { FormLoading, useFormLoading } from '../../../components/FormLoading';
import AnnouncementForm from '../../../components/announcement/Form';
import { createAnnouncementFormData } from '../../../helpers/utils';
import { useSession } from '../../../providers/SessionProvider';

export default function AnnouncementCreateScreen() {
  const { session } = useSession();
  const { visible, hideDialog, showDialog, goBack } = useFormLoading();

  async function handleSubmit(data) {
    const postUri = `${process.env.EXPO_PUBLIC_BASE_URL}/announcement`;

    showDialog();
    const form = new createAnnouncementFormData(data);
    try {
      await axios.post(postUri, form, {
        headers: {
          Authorization: `Bearer ${session}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.log('Error submitting form', error.message);
    } finally {
      hideDialog();
      goBack();
    }
  }

  const defaultValues = {
    recipient: '',
    subject: '',
    body: '',
    pin: false,
    attachments: [],
    tags: [],
  };

  return (
    <>
      <AnnouncementForm
        defaultValues={defaultValues}
        defaultTags={[]}
        onSubmit={handleSubmit}
      />
      <FormLoading visible={visible} />
    </>
  );
}
