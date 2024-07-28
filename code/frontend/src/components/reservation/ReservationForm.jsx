import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { id, registerTranslation } from 'react-native-paper-dates';

import { reservationSchema } from '../../helpers/schemas';
import { updateDateTime } from '../../helpers/utils';
import { ConfirmationDialog, useConfirmation } from '../ConfirmationDialog';
import DateField from '../DateField';
import InputHelper from '../InputHelper';
import InputLabel from '../InputLabel';
import TimeField from '../TimeField';
import AgendaBottomSheet from './AgendaBottomSheet';
import RoomBottomSheet from './RoomBottomSheet';
import RoomField from './RoomField';

export default function Form({ defaultValues, onSubmit }) {
  registerTranslation('id', id);

  const roomBottomSheetModalRef = useRef(null);
  const agendaBottomSheetModalRef = useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(reservationSchema),
  });

  const { visible: confirmationVisible, showDialog: confirmationShowDialog } =
    useConfirmation();

  const handlePresentRoomModalPress = useCallback(() => {
    roomBottomSheetModalRef.current?.present();
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
          render={({ field: { onChange, value } }) => {
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
        render={({ field: { onChange, value } }) => {
          return (
            <>
              <RoomField
                selectedRoom={value}
                setSelectedRoom={onChange}
                onPresentModalPress={handlePresentRoomModalPress}
                onPresentAgendaModalPress={handlePresentAgendaModalPress}
              />
              {value.name?.length > 0 && (
                <>
                  <InputLabel
                    isRequired={false}
                    title='Kapasitas'
                  />
                  <Text>{value.capacity}</Text>
                  <InputLabel
                    isRequired={false}
                    title='Deskripsi'
                  />
                  <Text>{value.description}</Text>
                </>
              )}
              <RoomBottomSheet
                ref={roomBottomSheetModalRef}
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
          onPress={() => confirmationShowDialog()}
        >
          Batal
        </Button>
        <ConfirmationDialog visible={confirmationVisible} />
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
        bottomSheetRef={agendaBottomSheetModalRef}
        control={control}
      />
    </View>
  );
}
