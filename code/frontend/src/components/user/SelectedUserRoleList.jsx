import { useCallback } from 'react';
import { FlatList } from 'react-native';
import SelectedUserRoleListItem from './SelectedUserRoleListItem';

export default function SelectedUserRoleList({
  selectedRoles,
  setSelectedRoles,
}) {
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <SelectedUserRoleListItem
          role={item}
          selectedRoles={selectedRoles}
          setSelectedRoles={setSelectedRoles}
        />
      );
    },
    [selectedRoles]
  );

  return (
    <FlatList
      data={selectedRoles}
      keyExtractor={(role, index) => index}
      renderItem={renderItem}
      horizontal={true}
      style={{ borderWidth: 1, borderColor: 'red' }}
    />
  );
}
