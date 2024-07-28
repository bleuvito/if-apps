import { router, useLocalSearchParams } from 'expo-router';
import { Appbar } from 'react-native-paper';

export default function ReservationDetailsHeaderRight({
  status,
  onPressDelete,
}) {
  const { reservationId } = useLocalSearchParams();
  // console.log(status);
  return (
    <>
      {status === 'PENDING' && (
        <Appbar.Action
          icon='pencil'
          onPress={() => router.push(`reservation/${reservationId}/edit`)}
        />
      )}
      <Appbar.Action
        icon='delete'
        onPress={onPressDelete}
      />
    </>
  );
}
