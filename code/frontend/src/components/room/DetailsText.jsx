import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function DetailsText({ title, body }) {
  return (
    <View>
      <Text variant='titleMedium'>{title}</Text>
      <Text variant='bodyLarge'>{body}</Text>
    </View>
  );
}
