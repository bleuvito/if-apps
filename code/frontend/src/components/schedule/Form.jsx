import 'dayjs/locale/id';
import { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Checkbox, Text, TextInput } from 'react-native-paper';

import dayjs from 'dayjs';
import TimeField from '../TimeField';
import BottomSheet from './BottomSheet.jsx';
import BottomSheetField from './TypeBottomSheetField';

export default function Form({ defaultValues, onSubmit }) {
  const [selectedType, setSelectedType] = useState('Kelas');
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
    <View style={{ flex: 1 }}>
      <Controller
        name='day'
        defaultValue=''
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <>
              <Text>Day</Text>
              <TextInput
                mode='outlined'
                value={dayjs(value).format('dddd, DD MMMM YYYY')}
                editable={false}
                disabled={true}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            </>
          );
        }}
      />
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
      <BottomSheetField
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        onPressBottomSheetPresent={handlePresentModalPress}
      />
      <Controller
        name='isRecurring'
        defaultValue=''
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <>
              <Checkbox.Item
                label='Mingguan'
                status={value ? 'checked' : 'unchecked'}
                onPress={() => onChange(!value)}
              />
            </>
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
          defaultValue=''
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
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
          defaultValue=''
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
      <BottomSheet
        ref={bottomSheetModalRef}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
    </View>
  );
}
