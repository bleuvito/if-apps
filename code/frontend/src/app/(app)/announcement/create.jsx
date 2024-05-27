import axios from 'axios';

import AnnouncementForm from '../../../components/announcement/Form';
import { createAnnouncementFormData } from '../../../helpers/utils';
import { useSession } from '../../../providers/SessionProvider';

export default function AnnouncementCreateScreen() {
  const { session } = useSession();

  async function handleSubmit(data) {
    const postUri = `${process.env.EXPO_PUBLIC_BASE_URL}/announcement`;
    console.log(data);
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
    <AnnouncementForm
      defaultValues={defaultValues}
      defaultTags={[]}
      onSubmit={handleSubmit}
    />
  );
}
