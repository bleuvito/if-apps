import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSession } from '../../../providers/SessionProvider';
import LoadingIndicator from '../../LoadingIndicator';
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
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: 16,
    padding: 16,
    paddingBottom: 48,
  },
});
