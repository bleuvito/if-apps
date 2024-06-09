import { useContext, useEffect, useState } from 'react';
import { Checkbox } from 'react-native-paper';

export default function TagBottomSheetListItem({
  tag,
  isSelected,
  selectedTags,
  setSelectedTags,
}) {
  const [checked, setChecked] = useState(isSelected);

  const handlePress = () => {
    if (checked) {
      const filteredTags = selectedTags.filter((selectedTag) => {
        return selectedTag.id !== tag.id;
      });
      setSelectedTags(filteredTags);
      setChecked(false);
    } else {
      setSelectedTags([...selectedTags, tag]);
      setChecked(true);
    }
  };

  return (
    <Checkbox.Item
      status={checked ? 'checked' : 'unchecked'}
      label={tag.name}
      onPress={handlePress}
    />
  );
}
