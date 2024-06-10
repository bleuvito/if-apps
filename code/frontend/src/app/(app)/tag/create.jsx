import axios from 'axios';
import { StyleSheet } from 'react-native';

import { FormLoading, useFormLoading } from '../../../components/FormLoading';
import TagForm from '../../../components/tag/TagForm';
import { useSession } from '../../../providers/SessionProvider';

export default function TagCreateScreen() {
  const { session } = useSession();
  const { visible, goBack, hideDialog, showDialog } = useFormLoading();

  const defaultValues = {
    name: '',
  };

  async function onSubmit(data) {
    try {
      const createUri = `${process.env.EXPO_PUBLIC_BASE_URL}/tag`;
      showDialog();
      const { data: response } = await axios.post(createUri, data, {
        headers: { Authorization: `Bearer ${session}` },
      });
      goBack();
    } catch (error) {
      console.error('Error creating tag', error);
    } finally {
      hideDialog();
    }
  }

  return (
    <>
      <TagForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
      />
      <FormLoading visible={visible} />
    </>
  );
}
