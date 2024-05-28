import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import { ActivityIndicator, Text } from 'react-native-paper';
import {
  FormLoading,
  useFormLoading,
} from '../../../../components/FormLoading';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import AnnouncementForm from '../../../../components/announcement/Form';
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
  const [defaultTags, setDefaultTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { visible, goBack, showDialog, hideDialog } = useFormLoading();

  async function handleSubmit(data) {
    const form = createAnnouncementFormData(data);

    const putUri = `${process.env.EXPO_PUBLIC_BASE_URL}/announcement/${announcementId}`;
    showDialog();
    try {
      const data = await axios.put(putUri, form, {
        headers: {
          Authorization: `Bearer ${session}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.log('Error submitting form', error);
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
        recipient: data.recipient,
        subject: data.subject,
        pin: data.isPinned,
        tags: data.tags,
      });
    } catch (error) {
      console.error('Error fetching data in announcement\\edit.jsx: ', error);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    getAnnouncement();
    // console.log(defaultValues);
  }, []);

  // useEffect(() => {
  //   // getAnnouncement();
  //   // console.log(defaultValues);
  // }, [defaultValues]);

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
