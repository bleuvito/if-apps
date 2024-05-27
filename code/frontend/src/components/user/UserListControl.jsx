import { useEffect, useState } from 'react';
import { useUserList } from '../../hooks/useUserList';
// import SearchInput from '../SearchInput';
import { View } from 'react-native';
import { useSession } from '../../providers/SessionProvider';
import SearchInput from '../SearchInput';
import UserRoleFilter from './UserRoleFilter';

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
    <View>
      {/* <SearchInput setSearch={setSearch} />; */}
      <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
        <SearchInput setSearch={setSearch} />
      </View>
      <View style={{ paddingLeft: 16, marginBottom: 16 }}>
        <UserRoleFilter setRoles={setRoles} />
      </View>
    </View>
  );
}
