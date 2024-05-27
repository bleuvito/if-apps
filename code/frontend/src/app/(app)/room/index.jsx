import axios from 'axios';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, FAB, List, Text } from 'react-native-paper';
import RoomCard from '../../../components/room/Card';
import RoomSearchInput from '../../../components/room/RoomSearchInput';
import { useSession } from '../../../providers/SessionProvider';

export default function RoomScreen() {
  const { session } = useSession();

  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRooms = async () => {
    setIsLoading(true);

    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/room`;
    try {
      const { data } = await axios.get(getUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });

      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms: ', error);
    }

    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      getRooms();
    }, [])
  );

  if (isLoading) {
    return <ActivityIndicator size='large' />;
  }

  return (
    <>
      <View style={{ paddingHorizontal: 16 }}>
        <RoomSearchInput setRooms={setRooms} />
      </View>
      <FlatList
        data={rooms}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => {
          return (
            <RoomCard
              key={item.id}
              room={item}
            />
          );
        }}
      />
      <FAB
        icon='plus'
        style={styles.fab}
        onPress={() => router.push('room/create')}
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
  listItemTitle: {
    flex: 1,
  },
  debug: {
    borderWidth: 1,
    borderColor: 'red',
  },
});
