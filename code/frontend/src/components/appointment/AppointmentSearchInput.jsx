import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useAppointment } from '../../providers/AppointmentProvider';
import SearchInput from '../SearchInput';

export default function AppointmentSearchInput({ setSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 600);

  useEffect(() => {
    setSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  return <SearchInput setSearch={setSearchQuery} />;
}
