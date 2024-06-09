import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import TagBottomSheetList from './TagBottomSheetList';
import TagBottomSheetSearch from './TagBottomSheetSearch';

export default function TagBottomSheet({
  bottomSheetRef,
  selectedTags,
  setSelectedTags,
}) {
  const snapPoints = useMemo(() => ['25%', '60%', '90%'], []);
  const topInset = useMemo(() => 60, []);

  const [search, setSearch] = useState('');

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

  const resetSearch = useCallback(
    (index) => {
      if (index === -1) {
        setSearch('');
      }
    },
    [setSearch]
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={0}
      topInset={topInset}
      overDragResistanceFactor={10}
      animateOnMount={true}
      backdropComponent={renderBackdrop}
      onChange={resetSearch}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <TagBottomSheetSearch
            search={search}
            setSearch={setSearch}
          />
        </View>
        <TagBottomSheetList
          search={search}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  searchContainer: { width: '100%', padding: 16 },
});
