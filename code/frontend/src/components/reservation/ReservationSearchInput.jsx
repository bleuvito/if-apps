import { useEffect, useState } from 'react';
import { useReservationList } from '../../hooks/useReservationList';
import { useSession } from '../../providers/SessionProvider';
import SearchInput from '../SearchInput';

export default function ReservationSearchInput({ setReservations }) {
  const { session } = useSession();
  const [search, setSearch] = useState('');

  const listReservations = async () => {
    setReservations(await useReservationList(session, search));
  };

  useEffect(() => {
    listReservations();
  }, [search]);

  return <SearchInput setSearch={setSearch} />;
}
