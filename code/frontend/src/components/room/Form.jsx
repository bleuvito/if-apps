import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import z from 'zod';
import { ConfirmationDialog, useConfirmation } from '../ConfirmationDialog';
import InputHelper from '../InputHelper';
import InputLabel from '../InputLabel';

const schema = z.object({
  name: z.string().min(1),
  capacity: z.coerce.number().int().gt(0),
  description: z.string().min(1),
});

export default function RoomForm({ defaultValues, onSubmit }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  async function handleFormSubmit(data) {
    data.capacity = Number(data.capacity);
    onSubmit(data);
  }

  const { visible: confirmationVisible, showDialog: confirmationShowDialog } =
    useConfirmation();

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, rowGap: 16 }}>
      <Controller
        name='name'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View>
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
      <Controller
        name='capacity'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View>
              <InputLabel
                isRequired={true}
                title='Kapasitas'
              />
              <TextInput
                mode='outlined'
                value={value}
                onBlur={onBlur}
                keyboardType='numeric'
                onChangeText={onChange}
              />
              <InputHelper
                error={errors.capacity}
                message='Kapasitas harus berupa bilangan bulat positif'
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
              <InputLabel
                isRequired={true}
                title='Deskripsi'
              />
              <TextInput
                mode='outlined'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                multiline={true}
              />
              <InputHelper
                error={errors.description}
                message='Deskripsi tidak boleh kosong'
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
          onPress={() => confirmationShowDialog()}
        >
          Batal
        </Button>
        <ConfirmationDialog visible={confirmationVisible} />
        <Button
          mode='contained'
          onPress={handleSubmit(handleFormSubmit)}
          style={{ flex: 1 }}
        >
          Simpan
        </Button>
      </View>
    </View>
  );
}
