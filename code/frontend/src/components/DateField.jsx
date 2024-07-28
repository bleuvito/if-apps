import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import InputLabel from './InputLabel';

export default function AppointmentDateField({ onChange, value }) {
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
    <View style={{}}>
      <InputLabel
        isRequired={true}
        title='Hari, Tanggal'
      />
      <TextInput
        mode='outlined'
        editable={false}
        value={
          value && `${dayjs(value).locale('id').format('dddd, D MMMM YYYY')}`
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
          startDate: new Date(),
        }}
        startYear={parseInt(dayjs().format('YYYY'))}
        endYear={parseInt(dayjs().format('YYYY'))}
      />
    </View>
  );
}
