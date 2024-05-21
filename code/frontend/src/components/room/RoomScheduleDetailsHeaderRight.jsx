import { router, useLocalSearchParams } from 'expo-router';
import { Appbar } from 'react-native-paper';

export default function RoomScheduleDetailsHeaderRight({ onPressDelete }) {
  const { roomId, roomScheduleId } = useLocalSearchParams();
  return (
    <>
      <Appbar.Action
        icon='pencil'
        onPress={() =>
          router.push(`/room/${roomId}/schedule/${roomScheduleId}/edit`)
        }
      />
      <Appbar.Action
        icon='delete'
        onPress={onPressDelete}
      />
    </>
  );
}
