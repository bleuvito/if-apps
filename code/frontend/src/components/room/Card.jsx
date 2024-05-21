import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Card, Icon, Text } from 'react-native-paper';

export default function RoomCard({ room }) {
  return (
    <Card
      onPress={() => {
        router.push(`room/${room.id}`);
      }}
    >
      <Card.Content>
        <Text variant='titleMedium'>{room.name}</Text>
        <View style={styles.body}>
          <Icon source='account' />
          <Text
            variant='bodyMedium'
            style={styles.capacity}
          >
            {room.capacity} orang
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  capacity: {
    marginLeft: 4,
  },
});
