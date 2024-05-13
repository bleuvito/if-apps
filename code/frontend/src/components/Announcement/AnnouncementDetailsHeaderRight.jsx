import { router, useLocalSearchParams } from 'expo-router';
import { Appbar } from 'react-native-paper';

export default function AnnouncementDetailsHeaderRight({ onPressDelete }) {
  const { announcementId } = useLocalSearchParams();
  return (
    <>
      <Appbar.Action
        icon='history'
        onPress={() => router.push(`announcement/${announcementId}/history/`)}
      />
      <Appbar.Action
        icon='pencil'
        onPress={() => router.push(`announcement/${announcementId}/edit`)}
      />
      <Appbar.Action
        icon='delete'
        onPress={onPressDelete}
      />
    </>
  );
}
