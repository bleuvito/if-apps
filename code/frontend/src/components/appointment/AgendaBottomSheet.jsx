import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import ParticipantCalendar from './ParticipantCalendar';

const AgendaBottomSheet = forwardRef(
  ({ selectedParticipant, control }, ref) => {
    const snapPoints = useMemo(() => ['30%', '50%', '100%'], []);

    const renderBackdrop = useCallback((props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ));

    return (
      <BottomSheetModal
        ref={ref}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        topInset={75}
      >
        <BottomSheetScrollView style={styles.contentContainer}>
          <ParticipantCalendar
            participantId={selectedParticipant?.id || null}
            control={control}
          />
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

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

export default AgendaBottomSheet;
