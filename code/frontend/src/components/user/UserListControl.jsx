import { useEffect, useState } from 'react';
import { useUserList } from '../../hooks/useUserList';
// import SearchInput from '../SearchInput';
import { useSession } from '../../providers/SessionProvider';
import SearchInput from '../SearchInput';
import UserRoleFilter from './UserRoleFIlter';

export default function UserListControl({ setUsers }) {
  const { session } = useSession();

  const [search, setSearch] = useState('');
  const [roles, setRoles] = useState([]);

  const listUsers = async () => {
    setUsers(await useUserList(session, search, roles));
  };

  useEffect(() => {
    listUsers();
  }, [search, roles]);

  return (
    <>
      {/* <SearchInput setSearch={setSearch} />; */}
      <SearchInput setSearch={setSearch} />
      <UserRoleFilter setRoles={setRoles} />
    </>
  );
}
