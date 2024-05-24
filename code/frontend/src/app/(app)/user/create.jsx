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
    <View style={{ flex: 1 }}>
      <Text>
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
            <>
              <TextInput
                mode='outlined'
                multiline={true}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                style={{
                  flex: 1 / 2,
                  marginTop: 30,
                }}
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
