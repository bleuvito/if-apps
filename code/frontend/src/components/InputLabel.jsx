import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function InputLabel({ isRequired, title }) {
  return (
    <View style={{ marginBottom: 4, flexDirection: 'row' }}>
      <Text variant='bodyMedium'>{title}</Text>
      {isRequired && (
        <Text
          variant='bodyMedium'
          style={{ color: 'red' }}
        >
          *
        </Text>
      )}
    </View>
  );
}
