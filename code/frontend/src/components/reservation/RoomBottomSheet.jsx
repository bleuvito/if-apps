import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSession } from '../../providers/SessionProvider';
import DayCheckbox from './DayCheckbox';

const RoomBottomSheet = forwardRef(({ selectedRoom, setSelectedRoom }, ref) => {
  const { session } = useSession();
  const snapPoints = useMemo(() => ['50%', '75%'], []);
  const [rooms, setRooms] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  ));

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await getRooms();
    setRefreshing(false);
  }, []);

  const renderItem = useCallback(({ item }) => {
    return (
      <DayCheckbox
        room={item}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />
    );
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
      console.error('Error');
    }

    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      getRooms();
    }, [])
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      topInset={50}
    >
      <BottomSheetView style={styles.contentContainer}>
        <BottomSheetFlatList
          data={rooms}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          keyExtractor={(room) => room.id}
          renderItem={renderItem}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
  },
});

export default RoomBottomSheet;
