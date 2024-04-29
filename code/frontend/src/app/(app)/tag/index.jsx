import {
  AddIcon,
  Box,
  Fab,
  FabIcon,
  FabLabel,
  Text,
} from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import { FlatList } from 'react-native';
import AnnouncementCard from '../../../components/AnnouncementCard';
import { tags } from '../../../data';

export default function AnnouncementScreen() {
  return (
    <>
      <FlatList
        data={tags}
        renderItem={({ item, index }) => {
          return <Text>{index}</Text>;
        }}
      />
      <Link
        asChild
        href={'/tag/create'}
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
