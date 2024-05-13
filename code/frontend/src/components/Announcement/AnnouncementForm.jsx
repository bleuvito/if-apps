import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Button, Checkbox, TextInput } from 'react-native-paper';

import RichTextEditor from '../RichTextEditor/RichTextEditor';
import AttachmentField from './AttachmentField';
import TagBottomSheet from './TagBottomSheet';
import TagField from './TagField';

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
  });
  const [selectedTags, setSelectedTags] = useState(defaultTags);
  const bottomSheetRef = useRef(null);

  async function handleFormSubmit(data) {
    data = { ...data, tags: selectedTags };
    await onSubmit(data);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Controller
          name='recipient'
          defaultValue=''
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <TextInput
                disabled={editMode}
                label='To'
                mode='outlined'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            );
          }}
        />
        <Controller
          name='subject'
          defaultValue=''
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <TextInput
                disabled={editMode}
                label='Subject'
                mode='outlined'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            );
          }}
        />
        <Controller
          name='body'
          defaultValue=''
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <RichTextEditor
                onChange={onChange}
                defaultValue={value}
              />
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
        <TagField
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          bottomSheetRef={bottomSheetRef}
        />
        <Controller
          name='pin'
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <Checkbox.Item
                label='Pin'
                status={value ? 'checked' : 'unchecked'}
                onPress={() => onChange(!value)}
              />
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
      </ScrollView>
      <TagBottomSheet
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        bottomSheetRef={bottomSheetRef}
      />
    </View>
  );
}
