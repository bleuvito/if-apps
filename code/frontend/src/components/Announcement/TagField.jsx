import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import TagList from './TagList';

export default function TagField({ control, name, bottomSheetRef }) {
  function handleOpenTagBottomSheet() {
    bottomSheetRef?.current.present();
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
        <Text variant='bodyMedium'>Tag</Text>
        <Button
          icon='plus'
          onPress={() => handleOpenTagBottomSheet()}
        >
          Tambah
        </Button>
      </View>
      <TagList
        control={control}
        name={name}
      />
    </View>
  );
}
