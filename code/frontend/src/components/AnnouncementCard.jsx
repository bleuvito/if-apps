import {
  Card,
  HStack,
  Heading,
  Icon,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import { Pin } from 'lucide-react-native';
import CategoryChip from './CategoryChip';

export default function AnnouncementCard({ announcement }) {
  return (
    <Link
      asChild
      href={`/announcement/${announcement.id}`}
    >
      <Pressable>
        <Card>
          <VStack>
            <HStack justifyContent='space-between'>
              <Heading is>{announcement.title}</Heading>
              <Icon
                as={Pin}
                alignSelf='flex-start'
              />
            </HStack>
            <Text
              isTruncated
              style={{ color: 'grey' }}
            >
              {announcement.shortDescription}
            </Text>
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
          </VStack>
        </Card>
      </Pressable>
    </Link>
  );
}
