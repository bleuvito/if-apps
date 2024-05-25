import { useCallback } from 'react';
import { FlatList } from 'react-native';
import NewSelectedTagListItem from './NewSelectedTagListItem';

export default function NewSelectedTagList({ selectedTags, setSelectedTags }) {
  // const renderItem = ({ item }) => <NewSelectedTagListItem tag={item} />;
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <NewSelectedTagListItem
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
      style={{ borderWidth: 1, borderColor: 'red' }}
    />
  );
}
