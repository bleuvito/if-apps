import { router } from 'expo-router';
import { useState } from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';

function useConfirmation() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const goBack = () => router.back();

  return { showDialog, hideDialog, visible, goBack, message, setMessage };
}

const ConfirmationDialog = ({ visible, hideDialog }) => {
  const goBack = () => router.back();

  return (
    <Portal>
      <Dialog visible={visible}>
        <Dialog.Icon icon='alert' />
        <Dialog.Title
          style={{
            textAlign: 'center',
          }}
        >
          Apakah Anda ingin membatalkan isi formulir? Isi dari formulir tidak
          akan disimpan!
        </Dialog.Title>
        <Dialog.Actions>
          <Button onPress={() => hideDialog()}>Tidak</Button>
          <Button onPress={() => goBack()}>Kembali</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export { ConfirmationDialog, useConfirmation };
