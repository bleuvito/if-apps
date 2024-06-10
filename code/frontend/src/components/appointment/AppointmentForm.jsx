import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { id, registerTranslation } from 'react-native-paper-dates';

import { appointmentSchema } from '../../helpers/schemas';
import { updateDateTime } from '../../helpers/utils';
import InputHelper from '../InputHelper';
import InputLabel from '../InputLabel';
import TimeField from '../TimeField';
import AgendaBottomSheet from './AgendaBottomSheet';
import AppointmentDateField from './AppointmentDateField';
import ParticipantBottomSheet from './ParticipantBottomSheet';
import AppointmentParticipantField from './ParticipantField';

export default function AppointmentForm({ defaultValues, onSubmit }) {
  registerTranslation('id', id);

  const participantBottomSheetModalRef = useRef(null);
  const agendaBottomSheetModalRef = useRef(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(appointmentSchema),
  });

  const handlePresentParticipantModalPress = useCallback(() => {
    participantBottomSheetModalRef.current?.present();
  }, []);

  const handlePresentAgendaModalPress = useCallback(() => {
    agendaBottomSheetModalRef.current?.present();
  }, []);

  async function handleFormSubmit(data) {
    const start = updateDateTime(data.date, data.start);
    const end = updateDateTime(data.date, data.end);

    delete data.date;
    data = {
      ...data,
      start,
      end,
    };

    onSubmit(data);
  }

  return (
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
          render={({ field: { onChange, value } }) => {
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
        render={({ field: { onChange, value } }) => {
          return (
            <View style={{ marginBottom: 16 }}>
              <InputLabel
                isRequired={true}
                title='Tempat'
              />
              <TextInput
                mode='outlined'
                value={value}
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
        render={({ field: { onChange, value } }) => {
          return (
            <>
              <View style={{ marginBottom: 32 }}>
                <AppointmentParticipantField
                  selectedParticipant={value}
                  setSelectedParticipant={onChange}
                  onPresentModalPress={handlePresentParticipantModalPress}
                  onPresentAgendaModalPress={handlePresentAgendaModalPress}
                />
                <InputHelper
                  error={errors.participant}
                  message={errors.participant?.message}
                />
              </View>
              <ParticipantBottomSheet
                bottomSheetRef={participantBottomSheetModalRef}
                selectedParticipant={value}
                setSelectedParticipant={onChange}
              />
              <AgendaBottomSheet
                bottomSheetRef={agendaBottomSheetModalRef}
                selectedParticipant={value}
                control={control}
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
          onPress={handleSubmit(handleFormSubmit)}
          style={{ flex: 1 }}
        >
          Simpan
        </Button>
      </View>
    </ScrollView>
  );
}
