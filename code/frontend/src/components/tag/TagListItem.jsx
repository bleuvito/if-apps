import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Card, Icon, Text } from 'react-native-paper';

export default function TagListItem({ tag }) {
  return (
    <Card onPress={() => router.push(`/tag/${tag.id}`)}>
      <Card.Content>
        <Text
          variant='titleLarge'
          style={styles.title}
        >
          {tag.name}
        </Text>
        <View style={styles.subheaderContainer}>
          <Icon source='account-outline' />
          <Text
            variant='bodySmall'
            numberOfLines={1}
            style={styles.subheaderText}
          >
            {tag.author.name}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: { marginBottom: 4 },
  subheaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subheaderText: { marginLeft: 4 },
});
