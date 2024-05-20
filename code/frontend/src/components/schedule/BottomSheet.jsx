import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import DayCheckbox from './TypeCheckBox';

const BottomSheet = forwardRef(({ selectedType, setSelectedType }, ref) => {
  const snapPoints = useMemo(() => ['25%'], []);

  const type = useMemo(() => ['KELAS', 'PERTEMUAN', 'LAINNYA'], []);
  const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  ));

  const renderItem = useCallback(({ item, index }) => {
    return (
      <DayCheckbox
        key={index}
        type={item}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
    );
  });

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      topInset={50}
    >
      <BottomSheetView style={styles.contentContainer}>
        <BottomSheetFlatList
          data={type}
          renderItem={renderItem}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

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

export default BottomSheet;
