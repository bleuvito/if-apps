import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { en, id, registerTranslation } from 'react-native-paper-dates';

import { useSession } from '../../providers/SessionProvider';
import TimeField from '../TimeField';
import AgendaBottomSheet from './AgendaBottomSheet';
import ParticipantBottomSheet from './BottomSheet';
import AppointmentDateField from './DateField';
import AppointmentParticipantField from './ParticipantField';

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
      participant: selectedParticipant,
    };

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
                <Text
                  variant='bodyMedium'
                  style={{ marginBottom: 4 }}
                >
                  Topik
                </Text>
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
        <Controller
          name='date'
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <AppointmentDateField
                onChange={onChange}
                value={value}
              />
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
          name='place'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ marginBottom: 4 }}>Place</Text>
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
        <Controller
          name='link'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ marginBottom: 8 }}>Link</Text>
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
        <AppointmentParticipantField
          selectedParticipant={selectedParticipant}
          setSelectedParticipant={setSelectedParticipant}
          onPresentModalPress={handlePresentModalPress}
          onPresentAgendaModalPress={handlePresentAgendaModalPress}
        />
        <View
          style={{
            flex: 1,
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
      </ScrollView>
      <ParticipantBottomSheet
        ref={bottomSheetModalRef}
        selectedParticipant={selectedParticipant}
        setSelectedParticipant={setSelectedParticipant}
      />
      <AgendaBottomSheet
        ref={agendaBottomSheetModalRef}
        selectedParticipant={selectedParticipant}
        control={control}
      />
    </View>
  );
}
