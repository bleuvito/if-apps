import axios from 'axios';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, FAB } from 'react-native-paper';

import SearchInput from '../../../components/SearchInput';
import TagFilter from '../../../components/announcement/AnnouncementTagFilter';
import AnnouncementCard from '../../../components/announcement/Card';
import FilterBar from '../../../components/announcement/FilterBar';
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

  return (
    <View style={{ flex: 1 }}>
      <FilterBar setAnnouncements={setAnnouncements} />
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size='large' />
        </View>
      ) : (
        <FlatList
          data={announcements}
          contentContainerStyle={styles.contentContainer}
          renderItem={({ item }) => {
            return (
              <AnnouncementCard
                key={item.id}
                announcement={item}
              />
            );
          }}
        />
      )}
      {role !== 'MAHASISWA' && (
        <FAB
          icon='plus'
          style={styles.fab}
          onPress={() => router.push('/announcement/create')}
        />
      )}
    </View>
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
