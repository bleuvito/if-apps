import { Chip, Text } from 'react-native-paper';

export default function TagChip({ id, name, selectedTags, setSelectedTags }) {
  function handleDeleteTag() {
    const filteredTags = selectedTags.filter((tag) => {
      return tag.id !== id;
    });
    setSelectedTags(filteredTags);
  }

  return (
    <Chip
      closeIcon='close'
      ellipsizeMode='middle'
      icon='tag'
      onClose={() => handleDeleteTag()}
    >
      <Text>{name}</Text>
    </Chip>
  );
}
