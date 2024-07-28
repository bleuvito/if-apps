import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';

import { useSession } from '../../providers/SessionProvider';
import { FormError, useFormError } from '../FormError';
import { FormLoading, useFormLoading } from '../FormLoading';

export default function ResponseButtons({
  status,
  userId,
  userRole,
  reserveeId,
}) {
  const { session } = useSession();
  const { reservationId } = useLocalSearchParams();
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

  const responseToReservation = useCallback(
    async (status) => {
      const putUri = `${process.env.EXPO_PUBLIC_BASE_URL}/reservation/${reservationId}/response`;
      try {
        formLoadingShow();

        const data = { status };
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

  if (userId === reserveeId && status === 'DECLINED') {
    return (
      <Button
        onPress={() => router.push(`reservation/${reservationId}/edit`)}
        mode='contained'
      >
        Reschedule
      </Button>
    );
  }

  if (['ADMIN', 'KAJUR', 'KALAB'].includes(userRole) && status === 'PENDING') {
    return (
      <>
        <View style={{ flexDirection: 'row' }}>
          <Button
            onPress={() => responseToReservation('DECLINED')}
            mode='outlined'
            style={{ flex: 1 }}
          >
            Tolak
          </Button>
          <Button
            onPress={() => responseToReservation('ACCEPTED')}
            mode='outlined'
            style={{ flex: 1 }}
          >
            Terima
          </Button>
        </View>
        <FormLoading visible={formLoadingVisible} />
        <FormError
          visible={formErrorVisible}
          message={message}
          hideDialog={formErrorHide}
        />
      </>
    );
  }

  return null;
}
