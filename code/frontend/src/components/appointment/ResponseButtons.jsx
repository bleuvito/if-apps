import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';

import { useSession } from '../../providers/SessionProvider';
import { FormError, useFormError } from '../FormError';
import { FormLoading, useFormLoading } from '../FormLoading';

export default function ResponseButtons({ status, userId, organizerId }) {
  const { session } = useSession();
  const { appointmentId } = useLocalSearchParams();
  const {
    visible: formLoadingVisible,
    showDialog: formLoadingShow,
    hideDialog: formLoadingHide,
    goBack,
  } = useFormLoading();
  const {
    visible: formErrorVisible,
    showDialog: formErrorShow,
    hideDialog: formErrorHide,
    message,
    setMessage,
  } = useFormError();

  const [visible, setVisible] = useState(false);
  const [declineReason, setDeclineReason] = useState('');

  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  const responseToInvite = useCallback(
    async (status, declineReason) => {
      const putUri = `${process.env.EXPO_PUBLIC_BASE_URL}/appointment/${appointmentId}`;
      try {
        formLoadingShow();

        const data = { status, declineReason };
        const { data: response } = await axios.patch(putUri, data, {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        });
        formLoadingHide();
        goBack();
      } catch (error) {
        formLoadingHide();
        setMessage(error.response.data);
        formErrorShow();
      }
    },
    [status]
  );

  if (status === 'ACCEPTED') {
    return null;
  }

  if (userId === organizerId) {
    if (status === 'DECLINED') {
      return (
        <Button
          onPress={() => router.push(`appointment/${appointmentId}/edit`)}
          mode='contained'
        >
          Reschedule
        </Button>
      );
    }

    return null;
  }

  if (status === 'DECLINED') {
    return null;
  }

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Button
          onPress={() => showDialog()}
          mode='outlined'
          style={{ flex: 1 }}
        >
          Tolak
        </Button>
        <Button
          onPress={() => responseToInvite('ACCEPTED')}
          mode='outlined'
          style={{ flex: 1 }}
        >
          Terima
        </Button>
      </View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>Masukkan alasan penolakan</Dialog.Title>
          <Dialog.Content>
            <TextInput
              value={declineReason}
              onChangeText={(text) => setDeclineReason(text)}
              mode='outlined'
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Batal</Button>
            <Button onPress={() => responseToInvite('DECLINED', declineReason)}>
              Tolak
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <FormLoading visible={formLoadingVisible} />
      <FormError
        visible={formErrorVisible}
        message={message}
        hideDialog={formErrorHide}
      />
    </>
  );
}
