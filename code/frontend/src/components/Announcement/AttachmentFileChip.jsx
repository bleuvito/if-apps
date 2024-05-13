import { Chip, Text } from 'react-native-paper';

export default function AttachmentFileChip({ idx, name, files, setFiles }) {
  function handleDeletePickedFile() {
    const filteredFiles = files
      .filter((file) => {
        return file.id !== idx;
      })
      .map((file, index) => {
        const id = index;
        return { ...file, id };
      });
    setFiles(filteredFiles);
  }

  return (
    <Chip
      icon='file'
      closeIcon='close'
      ellipsizeMode='middle'
      onClose={() => handleDeletePickedFile()}
    >
      <Text>{name}</Text>
    </Chip>
  );
}
