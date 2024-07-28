import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import RoomCalendar from './RoomCalendar';

export default function AgendaBottomSheet({ bottomSheetRef, control }) {
  const snapPoints = useMemo(() => ['30%', '50%', '100%'], []);
  const topInset = useMemo(() => 60, []);

  const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  ));

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      topInset={topInset}
    >
      <BottomSheetScrollView style={styles.contentContainer}>
        <RoomCalendar control={control} />
      </BottomSheetScrollView>
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
  },
});
