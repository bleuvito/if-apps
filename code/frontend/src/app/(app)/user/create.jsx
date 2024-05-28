import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import z from 'zod';
import { FormLoading, useFormLoading } from '../../../components/FormLoading';
import InputHelper from '../../../components/InputHelper';
import { useSession } from '../../../providers/SessionProvider';

const schema = z.object({
  users: z.string().min(1, { message: 'Form harus diisi' }),
});

export default function RoomCreateScreen() {
  const { session } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    users: '',
    resolver: zodResolver(schema),
  });

  const {
    visible: formLoadingVisible,
    showDialog: formLoadingShow,
    hideDialog: formLoadingHide,
    goBack,
  } = useFormLoading();

  const [errorUsers, setErrorUsers] = useState([]);

  async function handleFormSubmit(data) {
    const postUri = `${process.env.EXPO_PUBLIC_BASE_URL}/user`;
    try {
      formLoadingShow();
      const { data: response } = await axios.post(postUri, data, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });

      if (response.error.length > 0) {
        setErrorUsers(response.error);
      }
      formLoadingHide();
    } catch (error) {
      console.error('Error creating user(s): ', error);
    }
  }

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
      <Text
        style={{ marginBottom: 16 }}
        variant='bodyMedium'
      >
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
                onChangeText={(text) => {
                  if (errorUsers.length > 0) {
                    setErrorUsers([]);
                  }
                  onChange(text);
                }}
                style={{
                  maxHeight: 500,
                }}
              />
              <InputHelper
                error={errors.users}
                message={errors.users?.message}
              />
            </>
          );
        }}
      />
      <Text style={{ color: 'red' }}>
        {errorUsers
          ? errorUsers
              .map((errorUser) => `${errorUser.error}: ${errorUser.line}`)
              .join('\n\n')
          : null}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 64,
          marginBottom: 64,
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
      <FormLoading visible={formLoadingVisible} />
    </ScrollView>
  );
}
