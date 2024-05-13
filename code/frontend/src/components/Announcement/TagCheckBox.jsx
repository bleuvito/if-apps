import { Checkbox } from 'react-native-paper';

export default function TagCheckBox({
  tag,
  isSelected,
  selectedTags,
  setSelectedTags,
}) {
  function handleSelectTag(tag) {
    setSelectedTags([...selectedTags, tag]);
  }

  function handleDeselectTag(tag) {
    const filteredTags = selectedTags.filter((selectedTag) => {
      return tag.id !== selectedTag.id;
    });
    setSelectedTags(filteredTags);
  }

  function handlePress() {
    if (isSelected) {
      handleDeselectTag(tag);
    } else {
      handleSelectTag(tag);
    }
  }

  return (
    <Checkbox.Item
      status={isSelected ? 'checked' : 'unchecked'}
      label={tag.name}
      onPress={() => handlePress()}
    />
  );
}
