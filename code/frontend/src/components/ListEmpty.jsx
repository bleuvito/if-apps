import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

export default function ListEmpty({ itemType }) {
  return (
    <View style={styles.container}>
      <Icon
        source='emoticon-sad-outline'
        size={75}
      />
      <Text
        variant='titleLarge'
        style={styles.text}
      >{`Tidak ada ${itemType}.`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3 / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { marginTop: 8 },
});
