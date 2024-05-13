import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import TimeInputDialog from './TimeInputDialog';

export default function AppointmentTimeField({ title, value, onChange }) {
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleShow = useCallback(() => {
    setDialogVisible(true);
  }, [setDialogVisible]);

  const handleHide = useCallback(() => {
    setDialogVisible(false);
  }, [setDialogVisible]);

  const handleConfirm = (hour, minute) => {
    onChange(new Date().setHours(hour, minute, 0, 0));
    setDialogVisible(false);
  };

  function formatTime(timestampInMilliseconds) {
    const dateObject = new Date(timestampInMilliseconds);
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <Text>{title}</Text>
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
