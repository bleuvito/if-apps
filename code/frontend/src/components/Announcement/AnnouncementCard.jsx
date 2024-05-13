import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Icon, Text, useTheme } from 'react-native-paper';
import { useSession } from '../../providers/SessionProvider';

export default function AnnouncementCard({ announcement, isRead }) {
  const theme = useTheme();
  const { getRole } = useSession();
  const role = getRole();

  const {
    id,
    author: { name },
    isPinned,
    subject,
    bodies: [{ createDate, snippet }],
    tags,
  } = announcement;

  const cardProps = isRead ?? { mode: 'contained' };
  return (
    <Card onPress={() => router.push(`announcement/${id}`)}>
      <Card.Title
        title={subject}
        titleVariant='titleLarge'
        subtitle={createDate}
        subtitleVariant='bodySmall'
        right={(props) => {
          return isPinned ? (
            <Icon
              {...props}
              source='pin'
              size={16}
            />
          ) : null;
        }}
        rightStyle={styles.pinIcon}
      />
      <Card.Content>
        <Text
          variant='bodyMedium'
          numberOfLines={2}
          style={styles.snippet}
        >
          {snippet}
        </Text>
        <Text
          variant='bodySmall'
          style={styles.tagTitle}
        >
          Tag:
        </Text>
        <View style={styles.chipContainer}>
          {tags.map((tag, index) => (
            <Chip
              compact
              key={index}
            >
              {tag.name}
            </Chip>
          ))}
        </View>
      </Card.Content>
      <Card.Actions>
        {role !== 'MAHASISWA' && (
          <Button
            mode='text'
            compact
            textColor={theme.colors.error}
          >
            Delete
          </Button>
        )}
      </Card.Actions>
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
    gap: 4,
  },
});
