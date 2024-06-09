import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { useSession } from '../../providers/SessionProvider';
import ListEmpty from '../ListEmpty';
import LoadingIndicator from '../LoadingIndicator';
import TagBottomSheetListItem from './TagBottomSheetListItem';

export default function TagBottomSheetList({
  search,
  selectedTags,
  setSelectedTags,
}) {
  const { session } = useSession();

  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredTags = tags.filter((tag) => {
    return tag.name.toLowerCase().includes(search.toLowerCase());
  });

  const listTag = async () => {
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/tag`;
    try {
      setIsLoading(true);
      const { data } = await axios.get(getUri, {
        headers: { Authorization: `Bearer ${session}` },
      });
      setTags(data);
    } catch (error) {
      console.error('Error fetching tag list: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = useCallback(
    ({ item }) => {
      const isSelected = selectedTags.some(
        (selectedTag) => selectedTag.id === item.id
      );

      return (
        <TagBottomSheetListItem
          tag={item}
          isSelected={isSelected}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      );
    },
    [selectedTags]
  );

  const renderListEmpty = useCallback(() => {
    return <ListEmpty itemType='tag pengumuman' />;
  }, []);

  useEffect(() => {
    listTag();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <BottomSheetFlatList
      data={filteredTags}
      keyExtractor={(tag) => tag.id}
      style={{ width: '100%', flex: 1 }}
      renderItem={renderItem}
      ListEmptyComponent={renderListEmpty}
    />
  );
}
