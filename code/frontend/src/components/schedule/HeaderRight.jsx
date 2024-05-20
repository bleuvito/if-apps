import { router, useLocalSearchParams } from 'expo-router';
import { Appbar } from 'react-native-paper';

export default function ScheduleDetailsHeaderRight({ onPressDelete }) {
  const { scheduleId } = useLocalSearchParams();
  return (
    <>
      <Appbar.Action
        icon='pencil'
        onPress={() => router.push(`schedule/${scheduleId}/edit`)}
      />
      <Appbar.Action
        icon='delete'
        onPress={onPressDelete}
      />
    </>
  );
}
