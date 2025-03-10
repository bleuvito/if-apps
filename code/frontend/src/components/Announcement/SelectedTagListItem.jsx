import { useCallback } from 'react';
import { Chip } from 'react-native-paper';

export default function SelectedTagListItem({
  tag,
  selectedTags,
  setSelectedTags,
}) {
  const handlePressClose = useCallback(() => {
    const filteredTags = selectedTags.filter((selectedTag) => {
      return selectedTag.id !== tag.id;
    });

    setSelectedTags(filteredTags);
  }, [selectedTags]);

  return (
    <Chip
      icon='tag'
      closeIcon='close'
      onClose={() => handlePressClose()}
    >
      {tag.name}
    </Chip>
  );
}
