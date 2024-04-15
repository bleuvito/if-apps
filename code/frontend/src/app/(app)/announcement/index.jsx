import { Badge, BadgeText, Pressable } from '@gluestack-ui/themed';
import {
  Box,
  Card,
  HStack,
  Text,
  VStack,
  Heading,
  Icon,
} from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import { Pin } from 'lucide-react-native';
import { FlatList } from 'react-native';

const announcements = [
  {
    id: 'd581b8b2-1de3-49a9-9381-36b8a582a42f',
    title: 'Informasi UTS di Labkom',
    shortDescription:
      'Selamat sore, berikut saya kirimkan shift UTS versi 2, Perubahan ditandai dengan...',
    categories: ['UTS', 'Labkom'],
    isPinned: true,
  },
  {
    id: '2942c38b-d1c0-45dc-a02a-3bebec38bdf9',
    title: 'Survey Kebutuhan Topik Tugas Akhir Semester Ganjil 2024-2025',
    shortDescription:
      'Information Technology and Siences Parahyangan Catholic University Bandung, Indonesia...',
    categories: ['Tugas Akhir'],
    isPinned: false,
  },
  {
    id: '382cc651-5bf5-456f-b097-362e3fb93568',
    title: 'Kuliah Tamu, Senin, 1 April 2024',
    shortDescription:
      'Information Technology and Siences Parahyangan Catholic University Bandung, Indonesia...',
    categories: ['Skripsi 2'],
    isPinned: false,
  },
  {
    id: '4dd45ae2-b528-4c62-a605-6d6a7090d47a',
    title: 'Kartu Bimbingan TA',
    shortDescription:
      'Information Technology and Siences Parahyangan Catholic University Bandung, Indonesia...',
    categories: ['Skripsi 2'],
    isPinned: false,
  },
  {
    id: '0ee09b3e-9b1a-4ef8-8b57-ada0a42935e6',
    title: 'Perubahan Rencana Studi (PRS) Semester Genap 2023-2024',
    shortDescription:
      'ke alamat informatika@unpar.ac.id sebelum hari Kamis 7 Maret 2024 pukul 23.59',
    categories: ['PRS'],
    isPinned: false,
  },
];

export default function AnnouncementScreen() {
  const announcement = announcements[0];

  return (
    <Link
      asChild
      href={`/announcement/${announcement.id}`}
    >
      <Pressable>
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
                <Badge
                  key={index}
                  borderRadius={'$full'}
                  px={'$4'}
                  py={'$1'}
                  action='muted'
                  alignItems='center'
                >
                  <BadgeText
                    textTransform='none'
                    color='black'
                  >
                    {category}
                  </BadgeText>
                </Badge>
              );
            })}
          </HStack>
        </VStack>
      </Pressable>
    </Link>
  );
}
