import { useCallback, useState } from 'react';
import { Chip, Text, TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

export default function AppointmentDateField({ onChange, value }) {
  // const [date, setDate] = useState(value);
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
    <>
      <Text>Date</Text>
      <TextInput
        mode='outlined'
        editable={false}
        value={
          value &&
          `${value.toLocaleString('en-GB', {
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
        locale='en'
        mode='single'
        visible={open}
        onDismiss={handleDismiss}
        date={value}
        onConfirm={handleConfirm}
        // validRange={{
        //   startDate: new Date(2021, 1, 2),  // optional
        //   endDate: new Date(), // optional
        //   disabledDates: [new Date()] // optional
        // }}
        // onChange={} // same props as onConfirm but triggered without confirmed by user
        // saveLabel="Save" // optional
        // saveLabelDisabled={true} // optional, default is false
        // uppercase={false} // optional, default is true
        // label="Select date" // optional
        // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
        // startYear={2000} // optional, default is 1800
        // endYear={2100} // optional, default is 2200
        //
      />
    </>
  );
}
