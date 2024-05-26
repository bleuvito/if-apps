import axios from 'axios';
import { Redirect, router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ActivityIndicator, FAB, Text } from 'react-native-paper';

// import TagCard from '../../../components/TagCard';
import UserCard from '../../../components/user/Card';
import UserListControl from '../../../components/user/UserListControl';
import UserSearchInput from '../../../components/user/UserSearchInput';
import { useSession } from '../../../providers/SessionProvider';

export default function UserScreen() {
  const { getRole, session } = useSession();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const userRole = getRole();

  if (!['ADMIN', 'KAJUR'].includes(userRole)) {
    return <Redirect href={'/'} />;
  }

  async function getUsers() {
    setIsLoading(true);
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/user`;
    const { data } = await axios.get(getUri, {
      headers: { Authorization: `Bearer ${session}` },
    });
    setUsers(data);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      getUsers();
    }, [])
  );

  async function handleRefresh() {
    setRefreshing(true);
    await getUsers();
    setRefreshing(false);
  }

  if (isLoading) {
    return <ActivityIndicator size='large' />;
  }

  return (
    <>
      <UserListControl setUsers={setUsers} />
      <FlatList
        data={users}
        contentContainerStyle={styles.contentContainer}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        keyExtractor={(user, index) => user.id}
        renderItem={({ item }) => {
          return <UserCard user={item} />;
        }}
      />
      <FAB
        icon='plus'
        style={styles.fab}
        onPress={() => router.push('/user/create')}
      />
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    gap: 16,
    padding: 16,
    paddingBottom: 48,
  },
});
