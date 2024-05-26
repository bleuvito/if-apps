import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Icon, Text, useTheme } from 'react-native-paper';

export default function AnnouncementCard({ announcement }) {
  return (
    <Card onPress={() => router.push(`announcement/${announcement.id}`)}>
      <Card.Content>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text
              variant='titleLarge'
              numberOfLines={1}
              style={{ marginBottom: 4 }}
            >
              {announcement.subject}
            </Text>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 8,
                }}
              >
                <Icon source='clock-outline' />
                <Text
                  variant='bodySmall'
                  numberOfLines={1}
                  style={{ marginLeft: 4 }}
                >
                  {dayjs(announcement.updatedAt)
                    .locale('id')
                    .format('DD MMM YYYY')}
                </Text>
              </View>
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
                  {announcement.author.name}
                </Text>
              </View>
            </View>
          </View>
          {announcement.isPinned && (
            <Icon
              source='pin'
              size={24}
            />
          )}
        </View>
        <Text
          variant='bodyMedium'
          numberOfLines={2}
        >
          {announcement.bodies[0].snippet}
        </Text>
        <View style={styles.chipContainer}>
          {announcement.tags.map((tag, index) => (
            <Chip
              compact
              icon='tag'
              key={index}
            >
              {tag.name}
            </Chip>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  pinIcon: {
    alignSelf: 'flex-start',
    marginRight: 8,
    marginTop: 16,
  },
  snippet: { marginBottom: 8 },
  tagTitle: {
    marginBottom: 4,
  },
  chipContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    gap: 4,
  },
});
