import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { en, id, registerTranslation } from 'react-native-paper-dates';
import AppointmentDateField from './AppointmentDateField';
import AppointmentTimeField from './AppointmentTimeField';

export default function AppointmentForm({ defaultValues, onSubmit }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  registerTranslation('en', en);

  const editMode = false;

  async function handleFormSubmit(data) {
    data = { ...data, tags: selectedTags };
    await onSubmit(data);
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
        <Controller
          name='participant'
          defaultValue=''
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <>
                <Text>Participant</Text>
                <TextInput
                  // disabled={editMode}
                  mode='outlined'
                  editable={false}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              </>
            );
          }}
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
    </View>
  );
}
