import { useCallback, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import TimeInput from './TimeInput';
import TimeInputDivider from './TimeInputDivider';

export default function TimeInputDialog({ visible, onHide, onConfirm }) {
  const theme = useTheme();
  const [hour, setHour] = useState('8');
  const [minute, setMinute] = useState('0');

  const handleHide = useCallback(() => {
    onHide(false);
  }, []);
  const handleConfirm = () => {
    onConfirm(hour, minute);
  };

  const handleChange = (
    interval,
    operator,
    state,
    minValue,
    maxValue,
    setState
  ) => {
    let newValue = Number(state) + interval * operator;
    if (newValue < minValue) {
      newValue = maxValue;
    }
    if (newValue > maxValue) {
      newValue = minValue;
    }

    setState(newValue.toString());
  };

  const handleHourChange = (operator) => {
    handleChange(1, operator, hour, 8, 17, setHour);
  };

  const handleMinuteChange = (operator) => {
    handleChange(15, operator, minute, 0, 45, setMinute);
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={handleHide}
        style={[
          { backgroundColor: theme.colors.surface },
          [
            styles.timePickerAndroid,
            Platform.OS === 'web' ? styles.timePickerWeb : null,
          ],
        ]}
      >
        <Dialog.Content>
          <Text>Select time</Text>
          <View style={[styles.inputContainer]}>
            <TimeInput
              onChange={handleHourChange}
              value={hour}
            />
            <TimeInputDivider />
            <TimeInput
              onChange={handleMinuteChange}
              value={minute}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => handleHide()}>Batal</Button>
          <Button onPress={() => handleConfirm()}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timePickerAndroid: {
    alignSelf: 'auto',
  },
  timePickerWeb: {
    alignSelf: 'center',
  },
});
