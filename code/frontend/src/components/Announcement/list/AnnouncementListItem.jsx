import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Card, Chip, Icon, Text } from 'react-native-paper';

export default function AnnouncementListItem({ announcement }) {
  return (
    <Card onPress={() => router.push(`announcement/${announcement.id}`)}>
      <Card.Content>
        <View style={styles.headerContainer}>
          <View style={styles.subjectContainer}>
            <Text
              variant='titleLarge'
              numberOfLines={1}
              style={styles.subject}
            >
              {announcement.subject}
            </Text>
            <View style={styles.subDetailsContainer}>
              <View style={[styles.subDetails, styles.updatedAt]}>
                <Icon source='clock-outline' />
                <Text
                  variant='bodySmall'
                  numberOfLines={1}
                  style={styles.subDetailsText}
                >
                  {dayjs(announcement.updatedAt)
                    .locale('id')
                    .format('DD MMM YYYY')}
                </Text>
              </View>
              <View style={styles.subDetails}>
                <Icon source='account-outline' />
                <Text
                  variant='bodySmall'
                  numberOfLines={1}
                  style={styles.subDetailsText}
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
  headerContainer: { flexDirection: 'row' },
  subjectContainer: { flex: 1 },
  subject: { marginBottom: 4 },
  subDetailsContainer: { flexDirection: 'row', marginBottom: 8 },
  subDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subDetailsText: { marginLeft: 4 },
  updatedAt: {
    marginRight: 8,
  },
  snippet: { marginBottom: 8 },
  chipContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    gap: 4,
  },
});
