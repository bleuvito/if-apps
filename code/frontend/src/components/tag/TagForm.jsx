import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { tagSchema } from '../../helpers/schemas';
import { ConfirmationDialog, useConfirmation } from '../ConfirmationDialog';
import InputHelper from '../InputHelper';
import InputLabel from '../InputLabel';

export default function TagForm({ onSubmit, defaultValues }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(tagSchema),
  });
  const { visible: confirmationVisible, showDialog: confirmationShowDialog } =
    useConfirmation();

  return (
    <View style={styles.container}>
      <Controller
        name='name'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View style={styles.inputContainer}>
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
      <View style={styles.buttonsContainer}>
        <Button
          mode='outlined'
          style={styles.button}
          onPress={() => confirmationShowDialog()}
        >
          Batal
        </Button>
        <ConfirmationDialog visible={confirmationVisible} />
        <Button
          mode='contained'
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        >
          Simpan
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  inputContainer: { marginBottom: 16 },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: { flex: 1 },
});
