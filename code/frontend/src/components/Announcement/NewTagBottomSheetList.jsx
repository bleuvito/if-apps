import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTagList } from '../../hooks/useTagList';
import { SelectedTagsProvider } from '../../providers/SelectedTagsProvider';
import { useSession } from '../../providers/SessionProvider';
import NewTagBottomSheetListItem from './NewTagBottomSheetListItem';

export default function NewTagBottomSheetList({
  selectedTags,
  setSelectedTags,
}) {
  const { session } = useSession();
  const [tags, setTags] = useState();

  const listTag = async () => {
    const tags = await useTagList(session);
    setTags(tags);
  };

  const renderItem = useCallback(
    ({ item }) => {
      const isSelected = selectedTags.some(
        (selectedTag) => selectedTag.id === item.id
      );

      return (
        <NewTagBottomSheetListItem
          tag={item}
          isSelected={isSelected}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      );
    },
    [selectedTags]
  );

  useEffect(() => {
    listTag();
  }, []);

  return (
    <BottomSheetFlatList
      data={tags}
      keyExtractor={(tag) => tag.id}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
});
