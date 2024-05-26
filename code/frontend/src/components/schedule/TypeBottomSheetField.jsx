import { View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

export default function BottomSheetField({
  selectedType,
  setSelectedType,
  onPressBottomSheetPresent,
}) {
  const handleDeleteValue = () => {
    setSelectedType('');
  };

  return (
    <View>
      <Text style={{ marginBottom: 4 }}>Type</Text>
      <TextInput
        mode='outlined'
        editable={false}
        right={
          selectedType === '' ? (
            <TextInput.Icon
              icon='plus'
              onPress={() => onPressBottomSheetPresent()}
            />
          ) : (
            <TextInput.Icon
              icon='close'
              onPress={() => handleDeleteValue()}
            />
          )
        }
        value={selectedType}
      />
    </View>
  );
}
