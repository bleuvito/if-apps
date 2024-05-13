import axios from 'axios';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Icon, Text } from 'react-native-paper';
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
    const {
      data: { data: response },
    } = await axios.get(getUri, {
      headers: { Authorization: `Bearer ${session}` },
    });
    const [{ bodies: announcementHistory }] = response;
    setAnnouncementHistory(announcementHistory);

    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      getAnnouncementHistory();
    }, [])
  );

  if (isLoading) {
    return <Text>Is Loading...</Text>;
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
              <Card.Title
                subtitle={item.createDate}
                subtitleVariant='bodySmall'
              />
              <Card.Content>
                <Text
                  variant='bodyMedium'
                  numberOfLines={2}
                  style={styles.snippet}
                >
                  {item.snippet}
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
