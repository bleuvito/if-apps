import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function ReservationDetailsText({ title, body }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text variant='bodyLarge'>{title}</Text>
      <Text variant='titleLarge'>{body}</Text>
    </View>
  );
}
