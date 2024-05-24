import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Card, Icon, Text } from 'react-native-paper';

export default function UserCard({ user }) {
  return (
    <Card
      onPress={() => {
        router.push(`user/${user.id}`);
      }}
    >
      <Card.Content>
        <Text variant='titleMedium'>{user.name}</Text>
        <View style={styles.body}>
          <Icon source='email' />
          <Text
            variant='bodyMedium'
            style={styles.capacity}
          >
            {user.email}
          </Text>
        </View>
        <View style={styles.body}>
          <Icon source='account-cog' />
          <Text
            variant='bodyMedium'
            style={styles.capacity}
          >
            {user.role}
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
