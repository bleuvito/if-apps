import { router, useLocalSearchParams } from 'expo-router';
import { Appbar } from 'react-native-paper';

export default function HeaderRight({ onPressDelete }) {
  const { roomId } = useLocalSearchParams();

  return (
    <>
      <Appbar.Action
        icon='calendar'
        onPress={() => router.push(`/room/${roomId}/schedule`)}
      />
      <Appbar.Action
        icon='pencil'
        onPress={() => router.push(`room/${roomId}/edit`)}
      />
      <Appbar.Action
        icon='delete'
        onPress={onPressDelete}
      />
    </>
  );
}
