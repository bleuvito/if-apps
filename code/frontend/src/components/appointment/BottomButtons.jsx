import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { useSession } from '../../providers/SessionProvider';

export default function BottomButtons({ status, userId, organizerId }) {
  const { session } = useSession();
  const { appointmentId } = useLocalSearchParams();

  const [visible, setVisible] = useState(false);
  const [declineReason, setDeclineReason] = useState('');

  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  if (status === 'ACCEPTED') {
    return null;
  }

  if (userId === organizerId) {
    if (status === 'DECLINED') {
      return (
        <Button
          onPress={() => router.push(`appointment/${appointmentId}/edit`)}
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

  const responseToInvite = useCallback(
    async (status, declineReason) => {
      const putUri = `${process.env.EXPO_PUBLIC_BASE_URL}/appointment/${appointmentId}`;
      const data = { status, declineReason };
      const { data: response } = await axios.patch(putUri, data, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
    },
    [status]
  );

  return (
    <>
      <Button onPress={() => showDialog()}>Decline</Button>
      <Button onPress={() => responseToInvite('ACCEPTED')}>Accept</Button>
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
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={() => responseToInvite('DECLINED', declineReason)}>
              Decline
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}
