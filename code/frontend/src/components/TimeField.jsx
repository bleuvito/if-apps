import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import InputLabel from './InputLabel';
import TimeInputDialog from './TimeInputDialog';

export default function TimeField({ title, value, onChange }) {
  const [dialogVisible, setDialogVisible] = useState(false);

  let currHour = '7',
    currMinute = '0';
  if (value) {
    currHour = dayjs(value).locale('id').format('HH');
    currMinute = dayjs(value).locale('id').format('mm');
  }

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
    return dayjs(dateTime).locale('id').format('HH:mm');
  }

  return (
    <View style={{ flexDirection: 'column' }}>
      <InputLabel
        title={title}
        isRequired={true}
      />
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
        currHour={currHour}
        currMinute={currMinute}
        visible={dialogVisible}
        onHide={handleHide}
        onConfirm={handleConfirm}
      />
    </View>
  );
}
