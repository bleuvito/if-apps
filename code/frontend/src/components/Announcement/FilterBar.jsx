import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAnnouncementList } from '../../hooks/useAnnouncementList';
import { useSession } from '../../providers/SessionProvider';
import SearchInput from '../SearchInput';
import AnnouncementTagFilter from './AnnouncementTagFilter';

export default function FilterBar({ setAnnouncements }) {
  const { session } = useSession();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const listAnnouncement = async () => {
    setAnnouncements(await useAnnouncementList(session, search, tags));
  };

  useEffect(() => {
    listAnnouncement();
  }, [search, tags]);

  return (
    <View>
      <SearchInput setSearch={setSearch} />
      <AnnouncementTagFilter setTags={setTags} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
