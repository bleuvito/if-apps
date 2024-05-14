import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { en, id, registerTranslation } from 'react-native-paper-dates';

import AppointmentDateField from './AppointmentDateField';
import AppointmentParticipantField from './AppointmentParticipantField';
import AppointmentTimeField from './AppointmentTimeField';
import ParticipantBottomSheet from './ParticipantBottomSheet';

export default function AppointmentForm({ defaultValues }) {
  registerTranslation('en', en);

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
  async function handleFormSubmit(data) {
    data = { ...data, selectedParticipant };
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
            name='timeStart'
            defaultValue={defaultValues.timeEnd}
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
            name='timeEnd'
            defaultValue={defaultValues.timeEnd}
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
