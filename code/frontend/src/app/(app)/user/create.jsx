import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useSession } from '../../../providers/SessionProvider';

export default function RoomCreateScreen() {
  const { session } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    users: '',
  });

  async function handleFormSubmit(data) {
    const postUri = `${process.env.EXPO_PUBLIC_BASE_URL}/user`;
    try {
      const { data: response } = await axios.post(postUri, data, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });

      console.log(response);
    } catch (error) {
      console.error('Error creating user(s): ', error);
    }
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <Text style={{ marginBottom: 16 }}>
        Gunakan text input di bawah untuk menambahkan satu atau lebih user.
        {'\n\n'}
        Setiap baris merepresentasikan sebuah user. Sintaks untuk setiap baris
        adalah sebagai berikut:
        {'\n\n'}
        NAMA,EMAIL,ROLE
        {'\n\n'}
        Role yang tersedia:
        {'\n'}
        ADMIN KAJUR KAPRODI KALAB DOSEN MAHASISWA
      </Text>

      <Controller
        name='users'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <TextInput
              mode='outlined'
              multiline={true}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={{
                maxHeight: 500,
              }}
            />
          );
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 64,
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
