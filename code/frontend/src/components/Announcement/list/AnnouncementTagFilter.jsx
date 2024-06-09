import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';

import { useDebounce } from '../../../hooks/useDebounce';
// import TagBottomSheet from '../TagBottomSheet';
import TagBottomSheet from '../TagBottomSheet';
import SelectedTagList from './SelectedTagList';

export default function TagFilter({ setTags }) {
  const tagBottomSheetRef = useRef(null);

  const [selectedTags, setSelectedTags] = useState([]);
  const debouncedSelectedTags = useDebounce(selectedTags, 600);

  const handlePresentModalPress = useCallback(() => {
    tagBottomSheetRef.current?.present();
  }, []);

  useEffect(() => {
    setTags(debouncedSelectedTags);
  }, [debouncedSelectedTags]);

  return (
    <View style={styles.container}>
      <Chip
        mode='outlined'
        closeIcon='menu-down'
        onPress={handlePresentModalPress}
        onClose={handlePresentModalPress}
        style={styles.filterButton}
      >
        Tag
      </Chip>
      <SelectedTagList
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <TagBottomSheet
        bottomSheetRef={tagBottomSheetRef}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  filterButton: { alignSelf: 'flex-start' },
});
