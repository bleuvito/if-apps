import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function AppointmentDetailsText({ title, body }) {
  return (
    <View>
      <Text variant='bodyLarge'>{title}</Text>
      <Text variant='titleLarge'>{body}</Text>
    </View>
  );
}
