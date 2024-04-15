import { Text, View } from '@gluestack-ui/themed';
import { Stack, useLocalSearchParams } from 'expo-router';
import Drawer from 'expo-router/drawer';

export default function AnnouncementDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
}
