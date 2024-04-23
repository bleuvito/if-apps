import { FlatList } from 'react-native';
import AnnouncementCard from '../../../components/AnnouncementCard';
import { announcements } from '../../../data';
import { AddIcon, Box, Fab, FabIcon, FabLabel } from '@gluestack-ui/themed';
import { Link } from 'expo-router';

export default function AnnouncementScreen() {
  return (
    <>
      <FlatList
        data={announcements}
        renderItem={({ item, index }) => {
          return (
            <AnnouncementCard
              key={item.id}
              announcement={item}
            />
          );
        }}
      />
      <Link
        asChild
        href={'/announcement/create'}
      >
        <Fab
          size='md'
          placement='bottom right'
        >
          <FabIcon
            as={AddIcon}
            mr='$1'
          />
          <FabLabel>Create</FabLabel>
        </Fab>
      </Link>
    </>
  );
}
