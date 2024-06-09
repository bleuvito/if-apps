import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import {
  FormLoading,
  useFormLoading,
} from '../../../../components/FormLoading';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import AnnouncementForm from '../../../../components/announcement/AnnouncementForm';
import { createAnnouncementFormData } from '../../../../helpers/utils';
import { useSession } from '../../../../providers/SessionProvider';

export default function AnnouncementEditScreen() {
  const { announcementId } = useLocalSearchParams();
  const { session } = useSession();

  const [defaultValues, setDefaultValues] = useState({
    recipient: '',
    subject: '',
    body: '',
    attachments: [],
    pin: false,
    tags: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const { visible, goBack, showDialog, hideDialog } = useFormLoading();

  async function handleSubmit(data) {
    const form = createAnnouncementFormData(data);
    console.log(form);

    const patchUri = `${process.env.EXPO_PUBLIC_BASE_URL}/announcement/${announcementId}`;
    showDialog();
    try {
      const { data } = await axios.patch(patchUri, form, {
        headers: {
          Authorization: `Bearer ${session}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.log('Error submitting form', error.request);
    } finally {
      hideDialog();
      goBack();
    }
  }

  async function getAnnouncement() {
    setIsLoading(true);

    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/announcement/${announcementId}`;
    try {
      const { data } = await axios.get(getUri, {
        headers: { Authorization: `Bearer ${session}` },
      });

      setDefaultValues({
        ...defaultValues,
        subject: data.subject,
        pin: data.isPinned,
        tags: data.tags,
        recipient: data.bodies[0].recipient,
        body: data.bodies[0].body,
      });
    } catch (error) {
      console.error('Error fetching data in announcement\\edit.jsx: ', error);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    getAnnouncement();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <AnnouncementForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        editMode
      />
      <FormLoading visible={visible} />
    </>
  );
}
