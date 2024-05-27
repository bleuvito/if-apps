import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import InputLabel from './InputLabel';

export default function DateField({ title, onChange, value }) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleConfirm = useCallback(
    (params) => {
      setOpen(false);
      onChange(params.date);
    },
    [setOpen]
  );

  return (
    <View>
      <InputLabel
        isRequired={true}
        title={title}
      />
      <TextInput
        mode='outlined'
        editable={false}
        value={
          value &&
          `${value.toLocaleString('id-ID', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}`
        }
        right={
          <TextInput.Icon
            icon='calendar'
            onPress={() => handleOpen()}
          />
        }
      />
      <DatePickerModal
        locale='id'
        mode='single'
        visible={open}
        onDismiss={handleDismiss}
        date={value}
        onConfirm={handleConfirm}
        validRange={{
          startDate: new Date(), // optional
          // endDate: new Date(), // optional
          // disabledDates: [new Date()] // optional
        }}
        // onChange={} // same props as onConfirm but triggered without confirmed by user
        // saveLabel="Save" // optional
        // saveLabelDisabled={true} // optional, default is false
        // uppercase={false} // optional, default is true
        // label="Select date" // optional
        // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
        startYear={parseInt(dayjs().format('YYYY'))} // optional, default is 1800
        endYear={parseInt(dayjs().format('YYYY'))} // optional, default is 2200
        //
      />
    </View>
  );
}
