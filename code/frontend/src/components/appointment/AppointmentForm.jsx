import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { en, id, registerTranslation } from 'react-native-paper-dates';

import { useSession } from '../../providers/SessionProvider';
import AppointmentDateField from './AppointmentDateField';
import AppointmentParticipantField from './AppointmentParticipantField';
import AppointmentTimeField from './AppointmentTimeField';
import ParticipantBottomSheet from './ParticipantBottomSheet';

export default function AppointmentForm({ defaultValues, onSubmit }) {
  registerTranslation('en', en);

  const { session } = useSession();
  const [selectedParticipant, setSelectedParticipant] = useState(
    defaultValues.participant
  );
  const bottomSheetModalRef = useRef(null);
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

  const dateToISOString = (date) => {
    date = new Date(date);
    return date.toISOString();
  };

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
    const startDateTime = updateAppointmentTime(data.date, data.startDateTime);
    const endDateTime = updateAppointmentTime(data.date, data.endDateTime);

    delete data.date;
    data = {
      ...data,
      startDateTime,
      endDateTime,
      participant: selectedParticipant,
    };

    onSubmit(data);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Controller
          name='topic'
          defaultValue=''
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <>
                <Text>Topic</Text>
                <TextInput
                  // disabled={editMode}
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
          render={({ field: { onChange, onBlur, value } }) => {
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
            name='startDateTime'
            defaultValue={defaultValues.startDateTime}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <AppointmentTimeField
                  title='Time Start'
                  value={value}
                  onChange={onChange}
                />
              );
            }}
          />
          <Controller
            name='endDateTime'
            defaultValue={defaultValues.endDateTime}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <AppointmentTimeField
                  title='Time End'
                  value={value}
                  onChange={onChange}
                />
              );
            }}
          />
        </View>
        <AppointmentParticipantField
          selectedParticipant={selectedParticipant}
          setSelectedParticipant={setSelectedParticipant}
          onPresentModalPress={handlePresentModalPress}
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
    </View>
  );
}
