import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Dialog, Portal } from 'react-native-paper';

function useFormLoading() {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const goBack = () => router.back();

  return { showDialog, hideDialog, visible, goBack };
}

const FormLoading = ({ visible }) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        dismissable={false}
      >
        <Dialog.Content>
          <ActivityIndicator size='large' />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export { FormLoading, useFormLoading };
