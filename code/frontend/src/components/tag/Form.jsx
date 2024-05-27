import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import z from 'zod';
// import { useSession } from '../../../providers/SessionProvider';

const schema = z.object({
  name: z.string().min(1),
});

export default function Form({ defaultValues, onSubmit }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  async function handleFormSubmit(data) {
    onSubmit(data);
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Controller
        name='name'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View style={{ marginBottom: 16 }}>
              <Text
                variant='bodyMedium'
                style={{ marginBottom: 4 }}
              >
                Nama
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
          onPress={handleSubmit(onSubmit)}
          style={{ flex: 1 }}
        >
          Submit
        </Button>
      </View>
    </View>
  );
}
