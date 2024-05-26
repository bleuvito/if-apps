import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import TimeInputDialog from './TimeInputDialog';

export default function TimeField({ title, value, onChange }) {
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleShow = useCallback(() => {
    setDialogVisible(true);
  }, [setDialogVisible]);

  const handleHide = useCallback(() => {
    setDialogVisible(false);
  }, [setDialogVisible]);

  const handleConfirm = (hour, minute) => {
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    onChange(date);
    setDialogVisible(false);
  };

  function formatTime(dateTime) {
    const time = new Date(dateTime);
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <Text style={{ marginBottom: 4 }}>{title}</Text>
      <TextInput
        editable={false}
        mode='outlined'
        value={value && formatTime(value)}
        right={
          <TextInput.Icon
            icon='clock-outline'
            onPress={() => {
              handleShow();
            }}
          />
        }
      />
      <TimeInputDialog
        visible={dialogVisible}
        onHide={handleHide}
        onConfirm={handleConfirm}
      />
    </View>
  );
}
