import axios from 'axios';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

import AnnouncementCard from '../../../components/announcement/AnnouncementCard';
import { useSession } from '../../../providers/SessionProvider';

export default function AnnouncementScreen() {
  const { getRole, session } = useSession();
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function getAnnouncements() {
    setIsLoading(true);
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/announcement`;
    const {
      data: { data },
    } = await axios.get(getUri, {
      headers: { Authorization: `Bearer ${session}` },
    });
    const announcements = JSON.parse(data).announcements;

    setAnnouncements(announcements);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      getAnnouncements();
    }, [])
  );

  const role = getRole();
  return (
    <>
      <FlatList
        data={announcements}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => {
          return (
            <AnnouncementCard
              key={item.id}
              announcement={item}
              isRead
            />
          );
        }}
      />
      {role !== 'MAHASISWA' && (
        <FAB
          icon='plus'
          style={styles.fab}
          onPress={() => router.push('/announcement/create')}
        />
      )}
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
