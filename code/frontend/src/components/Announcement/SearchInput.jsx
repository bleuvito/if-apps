import { useEffect, useState } from 'react';
import { Searchbar, TextInput } from 'react-native-paper';
import { useAnnouncementList } from '../../hooks/useAnnouncementList';
import { useDebounce } from '../../hooks/useDebounce';
import { useSession } from '../../providers/SessionProvider';

export default function SearchInput({ setSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 600);

  useEffect(() => {
    setSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  return (
    <Searchbar
      placeholder='Search'
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
}
