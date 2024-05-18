import { router, useLocalSearchParams } from 'expo-router';
import { Appbar } from 'react-native-paper';

export default function AppointmentDetailsHeaderRight({
  onPressDelete,
  status,
}) {
  const { appointmentId } = useLocalSearchParams();
  return (
    <>
      {status === 'PENDING' && (
        <Appbar.Action
          icon='pencil'
          onPress={() => router.push(`appointment/${appointmentId}/edit`)}
        />
      )}
      <Appbar.Action
        icon='delete'
        onPress={onPressDelete}
      />
    </>
  );
}
