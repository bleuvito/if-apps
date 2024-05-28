import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SearchBar } from 'react-native-screens';
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
        {/* <View style={{ width: '100%', padding: 16 }}>
          <TextInput
            mode='outlined'
            placeholder='Cari tag'
            style={{ width: '100%' }}
          />
        </View> */}
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
