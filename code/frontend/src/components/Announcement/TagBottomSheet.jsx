import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { useSession } from '../../providers/SessionProvider';
import TagCheckBox from './TagCheckBox';

export default function TagBottomSheet({
  bottomSheetRef,
  selectedTags,
  setSelectedTags,
}) {
  const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { session } = useSession();

  async function getTags() {
    setIsLoading(true);
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/tag`;
    const { data } = await axios.get(getUri, {
      headers: { Authorization: `Bearer ${session}` },
    });
    setTags(data);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      getTags();
    }, [])
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await getTags();
    setRefreshing(false);
  }, []);

  const handleSheetChanges = useCallback((index) => {}, []);

  const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  ));

  const renderItem = useCallback(({ item }) => {
    const isSelected = selectedTags.some((selectedTag) => {
      return selectedTag.id === item.id;
    });

    return (
      <TagCheckBox
        tag={item}
        isSelected={isSelected}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
    );
  });

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}
    >
      <BottomSheetView
        style={{
          flex: 1,
        }}
      >
        <BottomSheetFlatList
          data={tags}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          keyExtractor={(tag) => tag.id}
          renderItem={renderItem}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}
