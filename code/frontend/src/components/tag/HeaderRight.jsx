import { router, useLocalSearchParams } from 'expo-router';
import { Appbar } from 'react-native-paper';

export default function TagDetailsHeaderRight({ onPressDelete }) {
  const { tagId } = useLocalSearchParams();
  return (
    <>
      <Appbar.Action
        icon='pencil'
        onPress={() => router.push(`tag/${tagId}/edit`)}
      />
      <Appbar.Action
        icon='delete'
        onPress={onPressDelete}
      />
    </>
  );
}
