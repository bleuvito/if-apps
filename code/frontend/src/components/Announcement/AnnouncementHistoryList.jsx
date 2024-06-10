import axios from 'axios';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { useSession } from '../../providers/SessionProvider';
import ListEmpty from '../ListEmpty';
import LoadingIndicator from '../LoadingIndicator';
import AnnouncementHistoryListItem from './AnnouncementHistoryListItem';

export default function AnnouncementHistoryList() {
  const { announcementId } = useLocalSearchParams();
  const { session } = useSession();
  const [announcementHistory, setAnnouncementHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getAnnouncementHistory() {
    try {
      const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/announcement/${announcementId}/history`;
      setIsLoading(true);

      const { data } = await axios.get(getUri, {
        headers: { Authorization: `Bearer ${session}` },
      });
      const [{ bodies: announcementHistory }] = data;
      setAnnouncementHistory(announcementHistory);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching announcement history list: ', error);
    }
  }

  const renderItem = useCallback(({ item }) => {
    return <AnnouncementHistoryListItem announcementHistory={item} />;
  }, []);

  const renderListEmpty = useCallback(() => {
    return <ListEmpty itemType='histori pengumuman' />;
  }, []);

  const onRefresh = useCallback(async () => {
    await getAnnouncementHistory();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getAnnouncementHistory();
    }, [])
  );

  if (isLoading) {
    <LoadingIndicator />;
  }

  return (
    <FlatList
      data={announcementHistory}
      keyExtractor={(announcementHistory) => announcementHistory.id}
      renderItem={renderItem}
      onRefresh={onRefresh}
      refreshing={isLoading}
      ListEmptyComponent={renderListEmpty}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    gap: 16,
    padding: 16,
    paddingBottom: 48,
  },
  listEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
