import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Appbar, Button, Dialog, Portal } from 'react-native-paper';
import { useSession } from '../../providers/SessionProvider';
import { FormLoading, useFormLoading } from '../FormLoading';

export default function AnnouncementDetailsHeaderDeleteButton() {
  const { appointmentId } = useLocalSearchParams();

  const { session } = useSession();
  const {
    visible: formDialogVisible,
    hideDialog: hideFormDialog,
    showDialog: showFormDialog,
    goBack,
  } = useFormLoading();

  const [visible, setVisible] = useState(false);

  function showDialog() {
    setVisible(true);
  }

  function hideDialog() {
    setVisible(false);
  }

  async function handleDeleteAnnouncement() {
    const deleteUri = `${process.env.EXPO_PUBLIC_BASE_URL}/appointment/${appointmentId}`;
    hideDialog();
    showFormDialog();
    try {
      const { data } = await axios.delete(deleteUri, {
        headers: { Authorization: `Bearer ${session}` },
      });
    } catch (error) {
      console.error('Error deleting announcement: ', error);
    } finally {
      hideFormDialog();
      goBack();
    }
  }

  return (
    <>
      <Appbar.Action
        icon='delete'
        onPress={showDialog}
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>Hapus pengumuman?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Batal</Button>
            <Button onPress={handleDeleteAnnouncement}>Hapus</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <FormLoading visible={formDialogVisible} />
    </>
  );
}
