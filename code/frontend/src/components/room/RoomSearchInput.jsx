import { useEffect, useState } from 'react';
import { useRoomList } from '../../hooks/useRoomList';
import { useSession } from '../../providers/SessionProvider';
import SearchInput from '../SearchInput';

export default function RoomSearchInput({ setRooms }) {
  const { session } = useSession();
  const [search, setSearch] = useState('');

  const listRooms = async () => {
    setRooms(await useRoomList(session, search));
  };

  useEffect(() => {
    listRooms();
  }, [search]);

  return <SearchInput setSearch={setSearch} />;
}
