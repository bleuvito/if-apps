import { Checkbox } from 'react-native-paper';

export default function TypeCheckbox({ type, selectedType, setSelectedType }) {
  const isSelected = selectedType === type;
  const handlePress = () => {
    if (isSelected) {
      setSelectedType('');
    } else {
      setSelectedType(type);
    }
  };

  return (
    <Checkbox.Item
      status={isSelected ? 'checked' : 'unchecked'}
      label={type}
      onPress={() => handlePress()}
    />
  );
}
