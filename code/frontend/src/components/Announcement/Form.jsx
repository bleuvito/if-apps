import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import {
  Button,
  Checkbox,
  HelperText,
  Text,
  TextInput,
} from 'react-native-paper';
import z from 'zod';

import InputHelper from '../InputHelper';
import InputLabel from '../InputLabel';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import AttachmentField from './AttachmentField.jsx';
import TagBottomSheet from './TagBottomSheet.jsx';
import TagField from './TagField.jsx';

const schema = z.object({
  recipient: z
    .string()
    .refine((emailValue) =>
      emailValue
        .split(',')
        .every((item) => z.string().email().safeParse(item).success)
    ),
  subject: z.string().min(1, { message: 'Subjek harus diisi!' }),
});

export default function AnnouncementForm({
  defaultValues,
  defaultTags,
  onSubmit,
  editMode,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const [selectedTags, setSelectedTags] = useState(defaultTags);
  const bottomSheetRef = useRef(null);

  async function handleFormSubmit(data) {
    data = { ...data, tags: selectedTags };
    await onSubmit(data);
  }

  return (
    <>
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
        <Controller
          name='recipient'
          defaultValue=''
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <View style={{ marginBottom: 16 }}>
                <View style={{ marginBottom: 4, flexDirection: 'row' }}>
                  <Text variant='bodyMedium'>To</Text>
                  <InputLabel
                    isRequired={true}
                    title='To'
                  />
                </View>
                <TextInput
                  disabled={editMode}
                  // label='To'
                  mode='outlined'
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder='if20@unpar.ac.id,if21@unpar.ac.id'
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
              <View style={{ marginBottom: 16 }}>
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
              <View style={{ marginBottom: 16 }}>
                <Text
                  variant='bodyMedium'
                  style={{ marginBottom: 4 }}
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
              <View style={{ marginBottom: 16 }}>
                <AttachmentField
                  files={value}
                  setFiles={onChange}
                />
              </View>
            );
          }}
        />
        <View style={{ marginBottom: 16 }}>
          <TagField
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            bottomSheetRef={bottomSheetRef}
          />
        </View>
        <Controller
          name='pin'
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <View
                style={{
                  marginBottom: 32,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text
                  variant='bodyMedium'
                  style={{ flex: 1 }}
                >
                  Pin
                </Text>
                <Checkbox
                  // label='Pin
                  status={value ? 'checked' : 'unchecked'}
                  onPress={() => onChange(!value)}
                />
              </View>
            );
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 96,
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
      </ScrollView>
      <TagBottomSheet
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        bottomSheetRef={bottomSheetRef}
      />
    </>
  );
}
