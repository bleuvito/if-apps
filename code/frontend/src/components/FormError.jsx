import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Button, Dialog, Portal } from 'react-native-paper';

function useFormError() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const goBack = () => router.back();

  return { showDialog, hideDialog, visible, goBack, message, setMessage };
}

const FormError = ({ visible, hideDialog, message }) => {
  return (
    <Portal>
      <Dialog visible={visible}>
        <Dialog.Icon icon='alert' />
        <Dialog.Title
          style={{
            textAlign: 'center',
          }}
        >
          {message}
        </Dialog.Title>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Tutup</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export { FormError, useFormError };
