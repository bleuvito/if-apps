import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import TagList from './TagList';

export default function TagField({
  selectedTags,
  setSelectedTags,
  bottomSheetRef,
}) {
  function handleOpenTagBottomSheet() {
    bottomSheetRef.current.snapToIndex(1);
  }

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text variant='titleMedium'>Tag</Text>
        <Button
          icon='plus'
          onPress={() => handleOpenTagBottomSheet()}
        >
          Add
        </Button>
      </View>
      <TagList
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
    </View>
  );
}
