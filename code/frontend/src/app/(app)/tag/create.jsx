import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { useSession } from '../../../providers/SessionProvider';

const defaultValues = {
  name: '',
};

export default function TagCreateScreen() {
  const { session } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
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
            <View>
              <TextInput
                label='Tag Name'
                mode='outlined'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.tag && (
                <HelperText
                  type='error'
                  visible={errors.tag}
                >
                  {errors.tag.message}
                </HelperText>
              )}
            </View>
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
          onPress={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </View>
    </View>
  );
}
