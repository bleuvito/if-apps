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
              <>
                <Text>Topic</Text>
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
            columnGap: 8,
          }}
        >
          <Controller
            name='start'
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
        <Controller
          name='place'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <>
                <Text>Place</Text>
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
          name='link'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <>
                <Text>Link</Text>
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
        <AppointmentParticipantField
          selectedParticipant={selectedParticipant}
          setSelectedParticipant={setSelectedParticipant}
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
