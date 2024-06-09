import { useCallback } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import TagFieldList from './TagFieldList';

export default function TagField({ control, name, bottomSheetRef }) {
  const handleOpenTagBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, [bottomSheetRef]);

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
      <TagFieldList
        control={control}
        name={name}
      />
    </View>
  );
}
