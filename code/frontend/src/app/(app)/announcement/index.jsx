import axios from 'axios';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ActivityIndicator, FAB } from 'react-native-paper';

import AnnouncementCard from '../../../components/announcement/Card';
import { useSession } from '../../../providers/SessionProvider';

export default function AnnouncementScreen() {
  const { getRole, session } = useSession();
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function getAnnouncements() {
    setIsLoading(true);

    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/announcement`;
    const { data } = await axios.get(getUri, {
      headers: { Authorization: `Bearer ${session}` },
    });
    setAnnouncements(data);

    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      getAnnouncements();
    }, [])
  );

  const role = getRole();

  if (isLoading) {
    return <ActivityIndicator size='large' />;
  }

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
