import { router, useLocalSearchParams } from 'expo-router';
import { Appbar } from 'react-native-paper';

export default function UserDetailsHeaderRight({ onPressDelete }) {
  const { userId } = useLocalSearchParams();
  return (
    <>
      <Appbar.Action
        icon='pencil'
        onPress={() => router.push(`user/${userId}/edit`)}
      />
      <Appbar.Action
        icon='delete'
        onPress={onPressDelete}
      />
    </>
  );
}
