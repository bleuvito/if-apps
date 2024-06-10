import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import { announcementSchema } from '../../helpers/schemas';
import { ConfirmationDialog, useConfirmation } from '../ConfirmationDialog';
import InputHelper from '../InputHelper';
import InputLabel from '../InputLabel';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import AttachmentField from './AttachmentField.jsx';
import TagBottomSheet from './TagBottomSheet';
import TagField from './TagField.jsx';

export default function AnnouncementForm({
  defaultValues,
  onSubmit,
  editMode,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(announcementSchema.partial()),
  });
  const bottomSheetRef = useRef(null);

  async function handleFormSubmit(data) {
    await onSubmit(data);
  }

  const { visible: confirmationVisible, showDialog: confirmationShowDialog } =
    useConfirmation();

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.notice}>
          <Text variant='titleMedium'>Perhatian!{'\n'}</Text>
          Pengumuman yang dibuat akan dikirim juga pada Gmail dengan menggunakan
          akun Anda. Lampiran akan diunggah ke Google Drive Anda dan akan
          dimasukkan dalam folder 'IF Apps'
        </Text>
        <Controller
          name='recipient'
          defaultValue=''
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <View style={styles.fieldContainer}>
                <InputLabel
                  isRequired={true}
                  title='To'
                />
                <TextInput
                  disabled={editMode}
                  mode='outlined'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
                <InputHelper
                  error={errors.recipient}
                  message='Format email penerima salah'
                />
              </View>
            );
          }}
        />
        <Controller
          name='subject'
          defaultValue=''
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <View style={styles.fieldContainer}>
                <InputLabel
                  isRequired={true}
                  title='Subjek'
                />
                <TextInput
                  disabled={editMode}
                  mode='outlined'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
                <InputHelper
                  error={errors.subject}
                  message='Subjek harus diisi'
                />
              </View>
            );
          }}
        />
        <Controller
          name='body'
          defaultValue=''
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <View style={styles.fieldContainer}>
                <Text
                  variant='bodyMedium'
                  style={styles.fieldLabel}
                >
                  Isi
                </Text>
                <RichTextEditor
                  onChange={onChange}
                  defaultValue={value}
                />
              </View>
            );
          }}
        />
        <Controller
          name='attachments'
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => {
            return (
              <AttachmentField
                files={value}
                setFiles={onChange}
              />
            );
          }}
        />
        <View style={styles.lastField}>
          <TagField
            control={control}
            name='tags'
            bottomSheetRef={bottomSheetRef}
          />
        </View>
        <View style={styles.buttonContainer}>
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
            onPress={handleSubmit(handleFormSubmit)}
            style={styles.button}
          >
            Simpan
          </Button>
        </View>
      </ScrollView>
      <Controller
        name='tags'
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <TagBottomSheet
              selectedTags={value}
              setSelectedTags={onChange}
              bottomSheetRef={bottomSheetRef}
            />
          );
        }}
      />
    </>
  );
}

const styles = {
  container: { flex: 1, paddingHorizontal: 16 },
  fieldContainer: { marginBottom: 16 },
  fieldLabel: { marginBottom: 4 },
  lastField: { marginBottom: 32 },
  buttonContainer: {
    flexDirection: 'row',
    paddingBottom: 96,
  },
  button: { flex: 1 },
  notice: { marginBottom: 32 },
};
