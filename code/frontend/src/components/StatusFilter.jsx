import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { useDebounce } from '../hooks/useDebounce';
import SelectedStatusList from './SelectedStatusList';
import StatusBottomSheet from './StatusBottomSheet';

export default function StatusFilter({ setStatuses }) {
  const bottomSheetRef = useRef(null);

  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const debouncedSelectedStatuses = useDebounce(selectedStatuses, 600);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  useEffect(() => {
    setStatuses(debouncedSelectedStatuses);
  }, [debouncedSelectedStatuses]);

  useFocusEffect(
    useCallback(() => {
      setSelectedStatuses([]);
    }, [])
  );

  return (
    <View style={{ flexDirection: 'row' }}>
      <Chip
        mode='outlined'
        closeIcon='menu-down'
        onPress={handlePresentModalPress}
        onClose={handlePresentModalPress}
        style={styles.filterButton}
      >
        Filter
      </Chip>
      <SelectedStatusList
        selectedStatuses={selectedStatuses}
        setSelectedStatuses={setSelectedStatuses}
      />
      <StatusBottomSheet
        bottomSheetRef={bottomSheetRef}
        selectedStatuses={selectedStatuses}
        setSelectedStatuses={setSelectedStatuses}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filterButton: { alignSelf: 'flex-start' },
});
