import { useCallback } from 'react';
import { FlatList } from 'react-native';
import SelectedStatusListItem from './SelectedStatusListItem';

export default function SelectedStatusList({
  selectedStatuses,
  setSelectedStatuses,
}) {
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <SelectedStatusListItem
          status={item}
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
        />
      );
    },
    [selectedStatuses]
  );

  return (
    <FlatList
      data={selectedStatuses}
      keyExtractor={(status, index) => index}
      renderItem={renderItem}
      horizontal={true}
      style={{ borderWidth: 1, borderColor: 'red' }}
    />
  );
}
