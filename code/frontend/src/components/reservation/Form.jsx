import 'dayjs/locale/id';
import { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { ca, en, id, registerTranslation } from 'react-native-paper-dates';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import z, { date, object } from 'zod';
import { atLeastOneDefined, updateDateTime } from '../../helpers/utils';
import InputHelper from '../InputHelper';
import InputLabel from '../InputLabel';
import TimeField from '../TimeField';
import AgendaBottomSheet from './AgendaBottomSheet';
import DateField from './DateField';
import RoomBottomSheet from './RoomBottomSheet';
import RoomField from './RoomField';

const schema = z
  .object({
    title: z.string().min(1),
    date: z.coerce.date(),
    start: z.coerce.date(),
    end: z.coerce.date(),
    room: z
      .object({
        id: z.string(),
        name: z.string(),
        capacity: z.number(),
        description: z.string(),
      })
      .partial()
      .refine(atLeastOneDefined, { message: 'Ruangan harus dipilih' }),
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
      const upEnd = updateDateTime(data.date, data.end);

      return upEnd > new Date();
    },
    {
      message: 'Waktu selesai harus melebihi waktu saat ini.',
      path: ['end'],
    }
  )
  .refine(
    (data) => {
      const upStart = updateDateTime(data.date, data.start);
      return upStart > new Date();
    },
    {
      message: 'Waktu mulai harus melebihi waktu saat ini.',
      path: ['start'],
    }
  );

export default function Form({ defaultValues, onSubmit }) {
  registerTranslation('id', id);

  const [selectedRoom, setSelectedRoom] = useState(defaultValues.room);
  const bottomSheetModalRef = useRef(null);
  const agendaBottomSheetModalRef = useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentAgendaModalPress = useCallback(() => {
    agendaBottomSheetModalRef.current?.present();
  }, []);

  async function handleFormSubmit(data) {
    const start = updateDateTime(data.date, data.start);
    const end = updateDateTime(data.date, data.end);
    const day = dayjs(data.date).locale('id').format('dddd').toUpperCase();

    delete data.date;
    data = {
      ...data,
      start,
      end,
      day,
    };

    onSubmit(data);
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, rowGap: 16 }}>
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
                message='Judul harus diisi'
              />
            </View>
          );
        }}
      />
      <Controller
        name='date'
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <>
              <DateField
                onChange={onChange}
                value={value}
              />
              <InputHelper
                error={errors.date}
                message={'Tanggal harus diisi'}
              />
            </>
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
          render={({ field: { onChange, value } }) => {
            return (
              <View style={{ flexDirection: 'column', flex: 1 }}>
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
              <View style={{ flexDirection: 'column', flex: 1 }}>
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
        name='room'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <>
              <RoomField
                selectedRoom={value}
                setSelectedRoom={onChange}
                onPresentModalPress={handlePresentModalPress}
                onPresentAgendaModalPress={handlePresentAgendaModalPress}
              />
              <RoomBottomSheet
                ref={bottomSheetModalRef}
                selectedRoom={value}
                setSelectedRoom={onChange}
              />
              <InputHelper
                error={errors.room}
                message={errors.room?.message}
              />
            </>
          );
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 32,
        }}
      >
        <Button
          mode='outlined'
          style={{ flex: 1 }}
        >
          Batal
        </Button>
        <Button
          mode='contained'
          onPress={handleSubmit(handleFormSubmit, (error) => {
            console.log(error);
          })}
          style={{ flex: 1 }}
        >
          Simpan
        </Button>
      </View>
      <AgendaBottomSheet
        ref={agendaBottomSheetModalRef}
        control={control}
        // selectedRoom={selectedRoom}
      />
    </View>
  );
}
