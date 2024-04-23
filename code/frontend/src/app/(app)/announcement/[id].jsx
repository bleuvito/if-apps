import { Text, View, Heading, HStack } from '@gluestack-ui/themed';
import { useLocalSearchParams } from 'expo-router';
import { announcements } from '../../../data';
import CategoryChip from '../../../components/CategoryChip';

export default function AnnouncementDetailScreen() {
  const { id } = useLocalSearchParams();
  const announcement = announcements.find((announcement) => {
    return announcement.id === id;
  });

  return (
    <View>
      <Heading>{announcement.title}</Heading>
      <HStack>
        {announcement.categories.map((category, index) => {
          return (
            <CategoryChip
              key={index}
              description={category}
            />
          );
        })}
      </HStack>
      <Text>{announcement.shortDescription}</Text>
    </View>
  );
}
