import 'dayjs/locale/id';
import { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Checkbox, Text, TextInput } from 'react-native-paper';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { en, id, registerTranslation } from 'react-native-paper-dates';
import z from 'zod';
import { updateDateTime } from '../../helpers/utils';
import { ConfirmationDialog, useConfirmation } from '../ConfirmationDialog';
import DateField from '../DateField';
import InputHelper from '../InputHelper';
import InputLabel from '../InputLabel';
import TimeField from '../TimeField';
import BottomSheet from './BottomSheet.jsx';
import BottomSheetField from './TypeBottomSheetField';

const schema = z
  .object({
    title: z.string().min(1, { message: 'Judul harus diisi' }),
    type: z.string().min(1, { message: 'Tipe harus dipilih' }),
    day: z.coerce.date({ message: 'Tanggal harus dipilih' }),
    start: z.coerce.date(),
    end: z.coerce.date(),
    isRecurring: z.boolean(),
  })
  .refine(
    (data) => {
      return data.end > data.start;
    },
    {
      message: 'Waktu mulai tidak boleh lebih dari waktu selesai',
      path: ['start'],
    }
  )
  .refine(
    (data) => {
      const upEnd = updateDateTime(data.day, data.end);

      // console.log(upEnd);
      return upEnd > new Date();
    },
    {
      message: 'Waktu selesai harus melebihi waktu saat ini.',
      path: ['end'],
    }
  )
  .refine(
    (data) => {
      const upStart = updateDateTime(data.day, data.start);
      return upStart > new Date();
    },
    {
      message: 'Waktu mulai harus melebihi waktu saat ini.',
      path: ['start'],
    }
  );

export default function Form({ defaultValues, onSubmit }) {
  registerTranslation('id', id);

  const [selectedType, setSelectedType] = useState(defaultValues.type);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
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
    };

    // console.log(data);

    onSubmit(data);
  }

  const { visible: confirmationVisible, showDialog: confirmationShowDialog } =
    useConfirmation();

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
              <InputLabel
                isRequired={true}
                title='Judul'
              />
              <TextInput
                mode='outlined'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              <InputHelper
                error={errors.title}
                message={errors.title?.message}
              />
            </View>
          );
        }}
      />
      <Controller
        name='type'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <>
              <BottomSheetField
                selectedType={value}
                setSelectedType={onChange}
                onPressBottomSheetPresent={handlePresentModalPress}
              />
              <BottomSheet
                ref={bottomSheetModalRef}
                selectedType={value}
                setSelectedType={onChange}
              />
            </>
          );
        }}
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
              <View style={{ flex: 1 }}>
                <TimeField
                  title='Waktu Mulai'
                  value={value}
                  onChange={onChange}
                />
                <InputHelper
                  error={errors.start}
                  message={errors.start?.message}
                />
              </View>
            );
          }}
        />
        <Controller
          name='end'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <View style={{ flex: 1 }}>
                <TimeField
                  title='Waktu Selesai'
                  value={value}
                  onChange={onChange}
                />
                <InputHelper
                  error={errors.end}
                  message={errors.end?.message}
                />
              </View>
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
          onPress={() => confirmationShowDialog()}
        >
          Batal
        </Button>
        <ConfirmationDialog visible={confirmationVisible} />
        <Button
          mode='contained'
          onPress={handleSubmit(handleFormSubmit, (errors) =>
            console.log(errors)
          )}
          style={{ flex: 1 }}
        >
          Simpan
        </Button>
      </View>
    </View>
  );
}
