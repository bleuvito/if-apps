import axios from 'axios';
import { useState } from 'react';
import { Appbar, Dialog, Portal } from 'react-native-paper';
import { FormLoading, useFormLoading } from '../FormLoading';

export default function AppointmentDetailsHeaderRightDeleteButton() {
  const [visible, setVisible] = useState(false);

  const {
    visible: formLoadingVisible,
    showDialog: formLoadingShow,
    hideDialog: formLoadingHide,
    goBack,
  } = useFormLoading();

  function showDialog() {
    setVisible(true);
  }

  function hideDialog() {
    setVisible(false);
  }

  const handleDeleteAppointment = async () => {
    const deleteUri = `${process.env.EXPO_PUBLIC_BASE_URL}/appointment/${appointmentId}`;

    hideDialog();
    formLoadingShow();
    try {
      const { data: deletedAppointment } = await axios.delete(deleteUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
    } catch (error) {
      console.error('Error deleting appointment: ', error);
    } finally {
      formLoadingHide();
      goBack();
    }
  };

  return (
    <>
      <Appbar.Action
        icon='delete'
        onPress={() => showDialog()}
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>Hapus janji temu?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Batal</Button>
            <Button onPress={handleDeleteAppointment}>Hapus</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <FormLoading visible={formLoadingVisible} />
    </>
  );
}
