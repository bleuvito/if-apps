import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useCallback, useMemo } from 'react';
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
      keyExtractor={(index) => index}
      renderItem={renderItem}
      style={{ width: '100%' }}
    />
  );
}
