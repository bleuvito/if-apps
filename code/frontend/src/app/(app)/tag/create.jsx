import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import z from 'zod';
import InputHelper from '../../../components/InputHelper';
import InputLabel from '../../../components/InputLabel';
import { useSession } from '../../../providers/SessionProvider';

const defaultValues = {
  name: '',
};

const schema = z.object({
  name: z.string().min(1),
});

export default function TagCreateScreen() {
  const { session } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  async function onSubmit(data) {
    const createUri = `${process.env.EXPO_PUBLIC_BASE_URL}/tag`;
    try {
      const { data: response } = await axios.post(createUri, data, {
        headers: { Authorization: `Bearer ${session}` },
      });
    } catch (error) {
      console.error('Error creating tag', error);
    }
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Controller
        name='name'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View style={{ marginBottom: 16 }}>
              <InputLabel
                isRequired={true}
                title='Nama'
              />
              <TextInput
                mode='outlined'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              <InputHelper
                error={errors.name}
                message='Nama harus diisi'
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
