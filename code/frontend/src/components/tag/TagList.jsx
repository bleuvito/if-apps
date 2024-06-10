import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { useSession } from '../../providers/SessionProvider';
import ListEmpty from '../ListEmpty';
import LoadingIndicator from '../LoadingIndicator';
import TagListItem from './TagListItem';

export default function TagList({ search }) {
  const { session } = useSession();

  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getTags() {
    try {
      setIsLoading(true);

      const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/tag`;
      const { data } = await axios.get(getUri, {
        headers: { Authorization: `Bearer ${session}` },
        params: { name: search },
      });
      setTags(data);

      setIsLoading(false);
    } catch (error) {
      console.error('Error gettting tag list: ', error);
    }
  }

  const onRefresh = useCallback(async () => {
    await getTags();
  }, []);

  const renderItem = useCallback(({ item }) => {
    return <TagListItem tag={item} />;
  }, []);

  const renderListEmpty = useCallback(() => {
    return <ListEmpty itemType='tag pengumuman' />;
  }, []);

  useFocusEffect(
    useCallback(() => {
      getTags();
    }, [])
  );

  useEffect(() => {
    getTags();
  }, [search]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <FlatList
      data={tags}
      keyExtractor={(tag) => tag.id}
      renderItem={renderItem}
      ListEmptyComponent={renderListEmpty}
      refreshing={isLoading}
      onRefresh={onRefresh}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    gap: 16,
    padding: 16,
    paddingTop: 8,
    paddingBottom: 48,
  },
});
