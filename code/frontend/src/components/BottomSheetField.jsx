import { Text, TextInput } from 'react-native-paper';

export default function BottomSheetField({
  title,
  value,
  setValue,
  onPressBottomSheetPresent,
}) {
  const handleDeleteValue = () => {
    setValue();
  };

  return (
    <>
      <Text>{title}</Text>
      <TextInput
        mode='outlined'
        editable={false}
        right={
          onPressBottomSheetPresent ? (
            <TextInput.Icon
              icon='close'
              onPress={() => handleDeleteValue()}
            />
          ) : (
            <TextInput.Icon
              icon='plus'
              onPress={() => onPressBottomSheetPresent()}
            />
          )
        }
        value={value || ''}
      />
    </>
  );
}
