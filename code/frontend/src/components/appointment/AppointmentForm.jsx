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

export default function AppointmentForm({ defaultValues }) {
  registerTranslation('en', en);

  const { session } = useSession();
  const [selectedParticipant, setSelectedParticipant] = useState({});
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

  const timeToISOString = (time) => {
    const [hour, minute] = time.split(':');
    const date = new Date();

    date.setHours(hour);
    date.setMinutes(minute);

    return date.toISOString();
  };

  async function handleFormSubmit(data) {
    const isoStartTime = timeToISOString(data.startTime);
    const isoEndTime = timeToISOString(data.endTime);
    data = {
      ...data,
      startTime: isoStartTime,
      endTime: isoEndTime,
      selectedParticipant,
    };

    const postUri = `${process.env.EXPO_PUBLIC_BASE_URL}/appointment`;
    try {
      const { data: response } = await axios.post(postUri, data, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
    } catch (error) {
      console.error('Error creating appointment', error);
    }
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
            name='startTime'
            defaultValue={defaultValues.startTime}
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
            name='endTime'
            defaultValue={defaultValues.endTime}
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
