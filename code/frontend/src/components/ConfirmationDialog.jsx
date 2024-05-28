import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Button, Dialog, Portal } from 'react-native-paper';

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
          Apakah Anda ingin kembali? Isi dari form tidak akan disimpan!
        </Dialog.Title>
        <Dialog.Actions>
          <Button onPress={() => goBack()}>Kembali</Button>
          <Button onPress={hideDialog}>Tidak</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export { ConfirmationDialog, useConfirmation };
