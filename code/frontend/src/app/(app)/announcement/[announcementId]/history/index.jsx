import axios from 'axios';
import dayjs from 'dayjs';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Card, Icon, Text } from 'react-native-paper';
import LoadingIndicator from '../../../../../components/LoadingIndicator';
import { useSession } from '../../../../../providers/SessionProvider';

export default function AnnouncementHistoryScreen() {
  const { announcementId } = useLocalSearchParams();
  const { session } = useSession();
  const [announcementHistory, setAnnouncementHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [refreshing, setRefreshing] = useState(false);

  async function getAnnouncementHistory() {
    setIsLoading(true);

    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/announcement/${announcementId}/history`;
    const { data } = await axios.get(getUri, {
      headers: { Authorization: `Bearer ${session}` },
    });
    const [{ bodies: announcementHistory }] = data;
    setAnnouncementHistory(announcementHistory);

    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      getAnnouncementHistory();
    }, [])
  );

  if (isLoading) {
    <LoadingIndicator />;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={announcementHistory}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => {
          return (
            <Card
              key={item.id}
              onPress={() =>
                router.push(`announcement/${announcementId}/history/${item.id}`)
              }
            >
              <Card.Content>
                <Text
                  variant='bodyMedium'
                  numberOfLines={2}
                  style={{ marginBottom: 8 }}
                  // style={styles.snippet}
                >
                  {item.snippet}
                </Text>
                <Text
                  variant='bodySmall'
                  style={{ fontStyle: 'italic', color: 'grey' }}
                >
                  Dibuat tanggal{' '}
                  {dayjs(item.createdAt).locale('id').format('DD MMMM YYYY')}
                </Text>
              </Card.Content>
            </Card>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    gap: 16,
    padding: 16,
    paddingBottom: 48,
  },
});
