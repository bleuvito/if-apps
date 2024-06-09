import { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import SelectedTagListItem from './SelectedTagListItem';

export default function SelectedTagList({ selectedTags, setSelectedTags }) {
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <SelectedTagListItem
          tag={item}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      );
    },
    [selectedTags]
  );

  return (
    <FlatList
      data={selectedTags}
      keyExtractor={(tag) => tag.id}
      renderItem={renderItem}
      horizontal={true}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: { marginLeft: 8, paddingRight: 48, gap: 8 },
});
