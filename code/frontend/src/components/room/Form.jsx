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
    <View style={{ flex: 1, paddingHorizontal: 16, rowGap: 16 }}>
      <Controller
        name='name'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View>
              <Text>Name</Text>
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
        name='capacity'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View>
              <Text>Capacity</Text>
              <TextInput
                mode='outlined'
                value={value}
                onBlur={onBlur}
                keyboardType='numeric'
                onChangeText={onChange}
              />
            </View>
          );
        }}
      />
      <Controller
        name='description'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View>
              <Text>Description</Text>
              <TextInput
                mode='outlined'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                multiline={true}
              />
            </View>
          );
        }}
      />
      <View
        style={{
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
    </View>
  );
}
