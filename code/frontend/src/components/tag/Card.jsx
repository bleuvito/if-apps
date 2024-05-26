import { router } from 'expo-router';
import { View } from 'react-native';
import { Button, Card, Icon, Text, useTheme } from 'react-native-paper';

export default function TagCard({ tag }) {
  const theme = useTheme();

  return (
    <Card onPress={() => router.push(`/tag/${tag.id}`)}>
      <Card.Content>
        <Text
          variant='titleLarge'
          style={{ marginBottom: 4 }}
        >
          {tag.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Icon source='account-outline' />
          <Text
            variant='bodySmall'
            numberOfLines={1}
            style={{ marginLeft: 4 }}
          >
            {tag.author.name}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}
