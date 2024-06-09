import axios from 'axios';

import { FormLoading, useFormLoading } from '../../../components/FormLoading';
import AnnouncementForm from '../../../components/announcement/AnnouncementForm';
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
      console.error('Error submitting form', error);
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
