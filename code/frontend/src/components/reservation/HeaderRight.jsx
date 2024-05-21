import { router, useLocalSearchParams } from 'expo-router';
import { Appbar } from 'react-native-paper';

export default function ReservationDetailsHeaderRight({ onPressDelete }) {
  const { reservationId } = useLocalSearchParams();
  return (
    <>
      <Appbar.Action
        icon='pencil'
        onPress={() => router.push(`reservation/${reservationId}/edit`)}
      />
      <Appbar.Action
        icon='delete'
        onPress={onPressDelete}
      />
    </>
  );
}
