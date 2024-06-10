import { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
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
      keyExtractor={(index) => index}
      renderItem={renderItem}
      horizontal={true}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: { marginLeft: 8, paddingRight: 48, gap: 8 },
});
