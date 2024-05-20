import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

export default function RoomForm({ defaultValues, onSubmit }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  async function handleFormSubmit(data) {
    data.capacity = Number(data.capacity);
    onSubmit(data);
  }

  return (
    <View style={{ flex: 1 }}>
      <Controller
        name='name'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <>
              <Text>Name</Text>
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
        name='capacity'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <>
              <Text>Capacity</Text>
              <TextInput
                mode='outlined'
                value={value}
                onBlur={onBlur}
                keyboardType='numeric'
                onChangeText={onChange}
              />
            </>
          );
        }}
      />
      <Controller
        name='description'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <>
              <Text>Description</Text>
              <TextInput
                mode='outlined'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                multiline={true}
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
    </View>
  );
}
