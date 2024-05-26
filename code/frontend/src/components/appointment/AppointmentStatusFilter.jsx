import { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';
import { useDebounce } from '../../hooks/useDebounce';
import SelectedStatusList from './SelectedStatusList';
import StatusBottomSheet from './StatusBottomSheet';

export default function AppointmentStatusFilter({ setStatuses }) {
  const statusBottomSheetRef = useRef(null);

  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const debouncedSelectedStatuses = useDebounce(selectedStatuses, 600);

  const handlePresentModalPress = useCallback(() => {
    statusBottomSheetRef.current?.present();
  }, []);

  useEffect(() => {
    setStatuses(debouncedSelectedStatuses);
  }, [debouncedSelectedStatuses]);

  return (
    <View style={{ flexDirection: 'row' }}>
      <Chip
        mode='outlined'
        closeIcon='menu-down'
        onPress={handlePresentModalPress}
        style={{ alignSelf: 'flex-start' }}
      >
        Status
      </Chip>
      <SelectedStatusList
        selectedStatuses={selectedStatuses}
        setSelectedStatuses={setSelectedStatuses}
      />
      <StatusBottomSheet
        bottomSheetRef={statusBottomSheetRef}
        selectedStatuses={selectedStatuses}
        setSelectedStatuses={setSelectedStatuses}
      />
    </View>
  );
}
