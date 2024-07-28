import { router, useLocalSearchParams } from 'expo-router';
import { Appbar } from 'react-native-paper';

import AppointmentDetailsHeaderRightDeleteButton from './AppointmentDetailsHeaderRightDeleteButton';

export default function AppointmentDetailsHeaderRight({ status }) {
  const { appointmentId } = useLocalSearchParams();
  return (
    <>
      {status === 'PENDING' && (
        <Appbar.Action
          icon='pencil'
          onPress={() => router.push(`appointment/${appointmentId}/edit`)}
        />
      )}
      <AppointmentDetailsHeaderRightDeleteButton />
    </>
  );
}
