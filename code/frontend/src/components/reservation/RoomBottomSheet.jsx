import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheetSearch from '../BottomSheetSearch';
import RoomBottomSheetList from './RoomBottomSheetList';

const RoomBottomSheet = forwardRef(({ selectedRoom, setSelectedRoom }, ref) => {
  const snapPoints = useMemo(() => ['50%', '75%'], []);
  const topInset = useMemo(() => 60, []);

  const [search, setSearch] = useState('');

  const resetSearch = useCallback(
    (index) => {
      if (index === -1) {
        setSearch('');
      }
    },
    [setSearch]
  );

  const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  ));

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={0}
      topInset={topInset}
      backdropComponent={renderBackdrop}
      onChange={resetSearch}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <BottomSheetSearch
            search={search}
            setSearch={setSearch}
            itemToSearchFor='ruangan'
          />
        </View>
        <RoomBottomSheetList
          search={search}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
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
  searchContainer: { width: '100%', padding: 16 },
});

export default RoomBottomSheet;
