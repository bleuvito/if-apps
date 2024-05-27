import { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import RolesBottomSheet from './RolesBottomSheet';

export default function Form({ defaultValues, onSubmit }) {
  const bottomSheetModalRef = useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  async function handleFormSubmit(data) {
    onSubmit(data);
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, rowGap: 16 }}>
      <Controller
        name='name'
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View>
              <Text>Name</Text>
              <TextInput
                mode='outlined'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            </View>
          );
        }}
      />
      <Controller
        name='email'
        defaultValue=''
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <View>
              <Text>Email</Text>
              <TextInput
                mode='outlined'
                value={value}
                onChangeText={onChange}
              />
            </View>
          );
        }}
      />
      <Controller
        name='role'
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <View style={{ marginBottom: 32 }}>
              <Text>Role</Text>
              <TextInput
                mode='outlined'
                editable={false}
                right={
                  value.length > 0 ? (
                    <TextInput.Icon
                      icon='close'
                      onPress={() => onChange('')}
                    />
                  ) : (
                    <TextInput.Icon
                      icon='plus'
                      onPress={() => handlePresentModalPress()}
                    />
                  )
                }
                value={value || ''}
              />

              <RolesBottomSheet
                ref={bottomSheetModalRef}
                selectedRole={value}
                setSelectedRole={onChange}
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
          Batal
        </Button>
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
