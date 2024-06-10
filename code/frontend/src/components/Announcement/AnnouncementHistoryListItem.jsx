import dayjs from 'dayjs';
import { router, useLocalSearchParams } from 'expo-router';
import { Card, Text } from 'react-native-paper';

export default function AnnouncementHistoryListItem({ announcementHistory }) {
  const { announcementId } = useLocalSearchParams();

  return (
    <Card
      onPress={() =>
        router.push(
          `announcement/${announcementId}/history/${announcementHistory.id}`
        )
      }
    >
      <Card.Content>
        <Text
          variant='bodyMedium'
          numberOfLines={2}
          style={{ marginBottom: 8 }}
        >
          {announcementHistory.snippet}
        </Text>
        <Text
          variant='bodySmall'
          style={{ fontStyle: 'italic', color: 'grey' }}
        >
          Dibuat pada{' '}
          {dayjs(announcementHistory.createdAt)
            .locale('id')
            .format('HH:mm, DD MMMM YYYY')}
        </Text>
      </Card.Content>
    </Card>
  );
}
