import { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';
import { useDebounce } from '../../hooks/useDebounce';
import { SelectedTagsProvider } from '../../providers/SelectedTagsProvider';
import NewSelectedTagList from './NewSelectedTagList';
import NewTagBottomSheet from './NewTagBottomSheet';

export default function TagFilter({ setTags }) {
  const newTagBottomSheetRef = useRef(null);

  const [selectedTags, setSelectedTags] = useState([]);
  const debouncedSelectedTags = useDebounce(selectedTags, 600);

  const handlePresentModalPress = useCallback(() => {
    newTagBottomSheetRef.current?.present();
  }, []);

  useEffect(() => {
    setTags(debouncedSelectedTags);
  }, [debouncedSelectedTags]);

  return (
    <>
      <SelectedTagsProvider>
        <View style={{ flexDirection: 'row' }}>
          <Chip
            mode='outlined'
            closeIcon='menu-down'
            onPress={handlePresentModalPress}
            style={{ alignSelf: 'flex-start' }}
          >
            Tag
          </Chip>
          <NewSelectedTagList
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
          <NewTagBottomSheet
            bottomSheetRef={newTagBottomSheetRef}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </View>
      </SelectedTagsProvider>
    </>
  );
}
