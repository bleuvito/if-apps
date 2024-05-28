import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { en, id, registerTranslation } from 'react-native-paper-dates';

import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { atLeastOneDefined, updateDateTime } from '../../helpers/utils';
import { useSession } from '../../providers/SessionProvider';
import InputHelper from '../InputHelper';
import InputLabel from '../InputLabel';
import TimeField from '../TimeField';
import AgendaBottomSheet from './AgendaBottomSheet';
import ParticipantBottomSheet from './BottomSheet';
import AppointmentDateField from './DateField';
import AppointmentParticipantField from './ParticipantField';

const schema = z
  .object({
    topic: z.string().min(1, { message: 'Topik harus diisi' }),
    date: z.coerce.date(),
    start: z.coerce.date(),
    end: z.coerce.date(),
    place: z.coerce.string().min(1, { message: 'Tempat harus diisi' }),
    status: z.string(),
    link: z
      .string()
      .url({ message: 'Harus berupa URL' })
      .optional()
      .or(z.literal('')),
    organizer: z.object({
      id: z.string(),
    }),
    participant: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .partial()
      .refine(atLeastOneDefined, { message: 'Partisipan harus dipilih' }),
  })
  .refine(
    (data) => {
      return data.end >= data.start;
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

export default function AppointmentForm({ defaultValues, onSubmit }) {
  registerTranslation('en', en);

  const [selectedParticipant, setSelectedParticipant] = useState(
    defaultValues.participant
  );
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
    };

    // console.log(data);

    onSubmit(data);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Controller
          name='topic'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <View style={{ marginBottom: 16 }}>
                <InputLabel
                  isRequired={true}
                  title='Topik'
                />
                <TextInput
                  mode='outlined'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
                <InputHelper
                  error={errors.topic}
                  message={errors.topic?.message}
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
              <View style={{ marginBottom: 16 }}>
                <AppointmentDateField
                  onChange={onChange}
                  value={value}
                />
                <InputHelper
                  error={errors.date}
                  message={errors.date?.message}
                />
              </View>
            );
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            columnGap: 16,
            marginBottom: 16,
          }}
        >
          <Controller
            name='start'
            control={control}
            render={({ field: { onChange, value } }) => {
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
          name='place'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <View style={{ marginBottom: 16 }}>
                <InputLabel
                  isRequired={true}
                  title='Tempat'
                />
                <TextInput
                  mode='outlined'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
                <InputHelper
                  error={errors.place}
                  message={errors.place?.message}
                />
              </View>
            );
          }}
        />
        <Controller
          name='link'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ marginBottom: 8 }}>Link Meeting</Text>
                <TextInput
                  mode='outlined'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder='https://meet.google.com'
                />
                <HelperText>Kosongkan bila luring</HelperText>
                <InputHelper
                  error={errors.link}
                  message={errors.link?.message}
                />
              </View>
            );
          }}
        />
        <Controller
          name='participant'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <>
                <View style={{ marginBottom: 32 }}>
                  <AppointmentParticipantField
                    selectedParticipant={value}
                    setSelectedParticipant={onChange}
                    onPresentModalPress={handlePresentModalPress}
                    onPresentAgendaModalPress={handlePresentAgendaModalPress}
                  />
                  <InputHelper
                    error={errors.participant}
                    message={errors.participant?.message}
                  />
                </View>
                <ParticipantBottomSheet
                  ref={bottomSheetModalRef}
                  selectedParticipant={value}
                  setSelectedParticipant={onChange}
                />
              </>
            );
          }}
        />
        <View
          style={{
            flex: 1,
            paddingBottom: 96,
            flexDirection: 'row',
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
            onPress={handleSubmit(handleFormSubmit, (error) =>
              console.log(error)
            )}
            style={{ flex: 1 }}
          >
            Simpan
          </Button>
        </View>
      </ScrollView>
      <AgendaBottomSheet
        ref={agendaBottomSheetModalRef}
        selectedParticipant={selectedParticipant}
        control={control}
      />
    </View>
  );
}
