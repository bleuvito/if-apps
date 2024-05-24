import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

export default function Form({ defaultValues, onSubmit }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  async function handleFormSubmit(data) {
    onSubmit(data);
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Controller
        name='name'
        defaultValue=''
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
          onPress={handleSubmit(handleFormSubmit)}
        >
          Submit
        </Button>
      </View>
    </View>
  );
}
