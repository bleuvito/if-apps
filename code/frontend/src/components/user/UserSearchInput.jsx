import { useEffect, useState } from 'react';
import { useUserList } from '../../hooks/useUserList';
import { useSession } from '../../providers/SessionProvider';
import SearchInput from '../SearchInput';

export default function UserSearchInput({ setUsers }) {
  const { session } = useSession();
  const [search, setSearch] = useState('');

  const listUsers = async () => {
    setUsers(await useUserList(session, search));
  };

  useEffect(() => {
    listUsers();
  }, [search]);

  return <SearchInput setSearch={setSearch} />;
}
