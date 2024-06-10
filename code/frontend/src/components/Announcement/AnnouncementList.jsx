import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import { useSession } from '../../providers/SessionProvider';
import ListEmpty from '../ListEmpty';
import LoadingIndicator from '../LoadingIndicator';
import AnnouncementListItem from './AnnouncementListItem';

export default function AnnouncementList({ subject, tags }) {
  const { session } = useSession();

  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getAnnouncements() {
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/announcement`;
    try {
      setIsLoading(true);
      const { data } = await axios.get(getUri, {
        headers: { Authorization: `Bearer ${session}` },
        params: { subject, tags },
      });

      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcement list: ', error);
    } finally {
      setIsLoading(false);
    }
  }

  const renderItem = useCallback(({ item }) => {
    return <AnnouncementListItem announcement={item} />;
  }, []);

  const renderListEmpty = useCallback(() => {
    return <ListEmpty itemType='pengumuman' />;
  }, []);

  const onRefresh = useCallback(async () => {
    await getAnnouncements();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getAnnouncements();
    }, [])
  );

  useEffect(() => {
    getAnnouncements();
  }, [subject, tags]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <FlatList
      data={announcements}
      keyExtractor={(announcement) => announcement.id}
      renderItem={renderItem}
      ListEmptyComponent={renderListEmpty}
      onRefresh={onRefresh}
      refreshing={isLoading}
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
