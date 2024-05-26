import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NewTagBottomSheetList from './NewTagBottomSheetList';

export default function NewTagBottomSheet({
  bottomSheetRef,
  selectedTags,
  setSelectedTags,
}) {
  // const safeInsets = useSafeAreaInsets();
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
      overDragResistanceFactor={10}
      animateOnMount={true}
      topInset={topInset}
    >
      <BottomSheetView style={styles.contentContainer}>
        <NewTagBottomSheetList
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
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
