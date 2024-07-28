import { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';
import { useDebounce } from '../../hooks/useDebounce';
import NewRoleBottomSheet from './NewRoleBottomSheet';
import SelectedUserRoleList from './SelectedUserRoleList';

export default function UserRoleFilter({ setRoles }) {
  const roleBottomSheetRef = useRef(null);

  const [selectedRoles, setSelectedRoles] = useState([]);
  const debouncedSelectedRoles = useDebounce(selectedRoles, 600);

  const handlePresentModalPress = useCallback(() => {
    roleBottomSheetRef.current?.present();
  }, []);

  useEffect(() => {
    setRoles(debouncedSelectedRoles);
  }, [debouncedSelectedRoles]);

  return (
    <View style={{ flexDirection: 'row' }}>
      <Chip
        mode='outlined'
        closeIcon='menu-down'
        onPress={handlePresentModalPress}
        onClose={handlePresentModalPress}
        style={{ alignSelf: 'flex-start' }}
      >
        Filter
      </Chip>
      <SelectedUserRoleList
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
      />
      <NewRoleBottomSheet
        bottomSheetRef={roleBottomSheetRef}
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
      />
    </View>
  );
}
