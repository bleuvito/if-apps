import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { useSession } from '../../providers/SessionProvider';
import ListEmpty from '../ListEmpty';
import LoadingIndicator from '../LoadingIndicator';
import BottomSheetListItem from './BottomSheetListItem';

export default function RoomBottomSheetList({
  search,
  selectedRoom,
  setSelectedRoom,
}) {
  const { session } = useSession();

  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredRooms = rooms.filter((room) => {
    return room.name.toLowerCase().includes(search.toLowerCase());
  });

  const getRooms = async () => {
    setIsLoading(true);

    try {
      const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/room`;
      const { data } = await axios.get(getUri, {
        headers: { Authorization: `Bearer ${session}` },
      });

      setRooms(data);
    } catch (error) {
      console.error('Error fetching room list: ', error);
    }

    setIsLoading(false);
  };

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <BottomSheetListItem
          room={item}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
        />
      );
    },
    [selectedRoom]
  );

  const renderListEmpty = useCallback(() => {
    return <ListEmpty itemType='ruangan' />;
  }, []);

  useFocusEffect(
    useCallback(() => {
      getRooms();
    }, [])
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <BottomSheetFlatList
      data={filteredRooms}
      refreshing={isLoading}
      onRefresh={getRooms}
      keyExtractor={(room) => room.id}
      renderItem={renderItem}
      ListEmptyComponent={renderListEmpty}
      style={{ flexGrow: 1 }}
    />
  );
}
