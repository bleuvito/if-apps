import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import RoleBottomSheetListItem from './RoleBottomSheetListItem';

export default function RoleBottomSheetList({
  selectedRoles,
  setSelectedRoles,
}) {
  const roles = useMemo(
    () => ['MAHASISWA', 'DOSEN', 'KALAB', 'KAPRODI', 'KAJUR', 'ADMIN'],
    []
  );

  const renderItem = useCallback(
    ({ item }) => {
      const isSelected = selectedRoles.some(
        (selectedRole) => selectedRole === item
      );

      return (
        <RoleBottomSheetListItem
          role={item}
          isSelected={isSelected}
          selectedRoles={selectedRoles}
          setSelectedRoles={setSelectedRoles}
        />
      );
    },
    [selectedRoles]
  );

  return (
    <BottomSheetFlatList
      data={roles}
      keyExtractor={(role, index) => index}
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
