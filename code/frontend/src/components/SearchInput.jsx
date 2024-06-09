import { useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from '../hooks/useDebounce';

export default function SearchInput({ setSearch, itemToSearchFor }) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 600);

  useEffect(() => {
    setSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  return (
    <Searchbar
      placeholder={`Cari ${itemToSearchFor}`}
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
}
