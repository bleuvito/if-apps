import axios from 'axios';
import { Redirect, router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ActivityIndicator, FAB, Text } from 'react-native-paper';

import TagCard from '../../../components/TagCard';
import { useSession } from '../../../providers/SessionProvider';

export default function TagScreen() {
  const { getRole, session } = useSession();
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const role = getRole();

  if (role === 'MAHASISWA') {
    return <Redirect href={'/'} />;
  }

  async function getTags() {
    setIsLoading(true);
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/tag`;
    const { data } = await axios.get(getUri, {
      headers: { Authorization: `Bearer ${session}` },
    });
    setTags(data);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      getTags();
    }, [])
  );

  async function handleRefresh() {
    setRefreshing(true);
    await getTags();
    setRefreshing(false);
  }

  if (isLoading) {
    return <ActivityIndicator size='large' />;
  }

  return (
    <>
      <FlatList
        data={tags}
        contentContainerStyle={styles.contentContainer}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        keyExtractor={(tag, index) => tag.id}
        renderItem={({ item }) => {
          return <TagCard tag={item} />;
        }}
      />
      <FAB
        icon='plus'
        style={styles.fab}
        onPress={() => router.push('/tag/create')}
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
