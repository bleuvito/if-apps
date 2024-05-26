import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import StatusBottomSheetList from './StatusBottomSheetList';

export default function StatusBottomSheet({
  bottomSheetRef,
  selectedStatuses,
  setSelectedStatuses,
}) {
  const snapPoints = useMemo(() => ['25%', '60%', '90%'], []);
  const topInset = useMemo(() => 60, []);

  // renders
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      topInset={topInset}
    >
      <BottomSheetView style={styles.contentContainer}>
        <StatusBottomSheetList
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
