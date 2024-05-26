import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import StatusBottomSheetListItem from './StatusBottomSheetListItem';

export default function StatusBottomSheetList({
  selectedStatuses,
  setSelectedStatuses,
}) {
  const statuses = useMemo(
    () => ['PENDING', 'ACCEPTED', 'DECLINED', 'RESCHEDULE'],
    []
  );

  const renderItem = useCallback(
    ({ item }) => {
      const isSelected = selectedStatuses.some(
        (selectedStatus) => selectedStatus === item
      );

      return (
        <StatusBottomSheetListItem
          status={item}
          isSelected={isSelected}
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
        />
      );
    },
    [selectedStatuses]
  );

  return (
    <BottomSheetFlatList
      data={statuses}
      keyExtractor={(status, index) => index}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
});
