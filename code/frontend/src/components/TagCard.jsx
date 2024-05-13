import { router } from 'expo-router';
import { Button, Card, useTheme } from 'react-native-paper';

export default function TagCard({ tag }) {
  const theme = useTheme();
  const { id, name } = tag;

  return (
    <Card onPress={() => router.push(`/tag/${id}`)}>
      <Card.Title
        title={name}
        titleVariant='titleLarge'
      />
      <Card.Actions>
        <Button
          mode='text'
          compact
          textColor={theme.colors.error}
        >
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );
}
