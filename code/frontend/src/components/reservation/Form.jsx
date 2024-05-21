import { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { en, id, registerTranslation } from 'react-native-paper-dates';

import TimeField from '../TimeField';
import AgendaBottomSheet from './AgendaBottomSheet';
import DateField from './DateField';
import RoomBottomSheet from './RoomBottomSheet';
import RoomField from './RoomField';

export default function Form({ defaultValues, onSubmit }) {
  registerTranslation('en', en);

  const [selectedRoom, setSelectedRoom] = useState(defaultValues.room);
  const bottomSheetModalRef = useRef(null);
  const agendaBottomSheetModalRef = useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentAgendaModalPress = useCallback(() => {
    agendaBottomSheetModalRef.current?.present();
  }, []);

  const updateAppointmentTime = (date, appointmentTime) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    appointmentTime.setDate(day);
    appointmentTime.setMonth(month);
    appointmentTime.setFullYear(year);

    return appointmentTime;
  };

  async function handleFormSubmit(data) {
    const start = updateAppointmentTime(data.date, data.start);
    const end = updateAppointmentTime(data.date, data.end);

    delete data.date;
    data = {
      ...data,
      start,
      end,
      room: selectedRoom,
    };

    onSubmit(data);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Controller
          name='title'
          defaultValue=''
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <>
                <Text>Title</Text>
                <TextInput
                  mode='outlined'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              </>
            );
          }}
        />
        <Controller
          name='date'
          defaultValue=''
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <DateField
                onChange={onChange}
                value={value}
              />
            );
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            columnGap: 8,
          }}
        >
          <Controller
            name='start'
            defaultValue={defaultValues.start}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <TimeField
                  title='Time Start'
                  value={value}
                  onChange={onChange}
                />
              );
            }}
          />
          <Controller
            name='end'
            defaultValue={defaultValues.end}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <TimeField
                  title='Time End'
                  value={value}
                  onChange={onChange}
                />
              );
            }}
          />
        </View>
        <RoomField
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          onPresentModalPress={handlePresentModalPress}
          onPresentAgendaModalPress={handlePresentAgendaModalPress}
        />
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Button mode='outlined'>Cancel</Button>
          <Button
            mode='contained'
            onPress={handleSubmit(handleFormSubmit)}
          >
            Submit
          </Button>
        </View>
      </ScrollView>
      <RoomBottomSheet
        ref={bottomSheetModalRef}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />
      <AgendaBottomSheet
        ref={agendaBottomSheetModalRef}
        control={control}
        selectedRoom={selectedRoom}
      />
    </View>
  );
}
