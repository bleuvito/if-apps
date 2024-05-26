import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { typeColor } from '../../constants';

export default function ScheduleLegend({ type }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
      <View
        style={{
          width: 12,
          height: 12,
          borderRadius: 2,
          backgroundColor: typeColor[type.toUpperCase()],
        }}
      ></View>
      <Text variant='bodySmall'>{type}</Text>
    </View>
  );
}
