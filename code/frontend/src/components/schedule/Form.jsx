import 'dayjs/locale/id';
import { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Checkbox, Text, TextInput } from 'react-native-paper';

import dayjs from 'dayjs';
import { en, id, registerTranslation } from 'react-native-paper-dates';
import DateField from '../DateField';
import TimeField from '../TimeField';
import BottomSheet from './BottomSheet.jsx';
import BottomSheetField from './TypeBottomSheetField';

export default function Form({ defaultValues, onSubmit }) {
  registerTranslation('id', id);

  const [selectedType, setSelectedType] = useState(defaultValues.type);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const bottomSheetModalRef = useRef(null);

  const setTimeToSelectedDate = (time, date) => {
    const day = dayjs(date).get('date');
    const month = dayjs(date).get('month');
    const year = dayjs(date).get('year');

    return dayjs(time).set('date', day).set('month', month).set('year', year);
  };

  async function handleFormSubmit(data) {
    data = {
      ...data,
      day: dayjs(data.day).locale('id').format('dddd').toUpperCase(),
      start: setTimeToSelectedDate(data.start, data.day),
      end: setTimeToSelectedDate(data.end, data.day),
      type: selectedType.toUpperCase(),
    };

    onSubmit(data);
  }

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <View style={{ flex: 1, rowGap: 16, paddingHorizontal: 16 }}>
      <Controller
        name='title'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View>
              <Text style={{ marginBottom: 4 }}>Title</Text>
              <TextInput
                mode='outlined'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            </View>
          );
        }}
      />
      <BottomSheetField
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        onPressBottomSheetPresent={handlePresentModalPress}
      />
      <Controller
        name='day'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <DateField
              title='Hari, Tanggal'
              onChange={onChange}
              value={new Date(value)}
            />
          );
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          columnGap: 16,
        }}
      >
        <Controller
          name='start'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <TimeField
                title='Waktu Mulai'
                value={value}
                onChange={onChange}
              />
            );
          }}
        />
        <Controller
          name='end'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <TimeField
                title='Waktu Selesai'
                value={value}
                onChange={onChange}
              />
            );
          }}
        />
      </View>
      <Controller
        name='isRecurring'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View
              style={{
                marginBottom: 32,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                variant='bodyMedium'
                style={{ flex: 1 }}
              >
                Mingguan
              </Text>
              <Checkbox
                // label='Pin
                status={value ? 'checked' : 'unchecked'}
                onPress={() => onChange(!value)}
              />
            </View>
          );
        }}
      />
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Button
          mode='outlined'
          style={{ flex: 1 }}
        >
          Cancel
        </Button>
        <Button
          mode='contained'
          onPress={handleSubmit(handleFormSubmit)}
          style={{ flex: 1 }}
        >
          Submit
        </Button>
      </View>
      <BottomSheet
        ref={bottomSheetModalRef}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
    </View>
  );
}
