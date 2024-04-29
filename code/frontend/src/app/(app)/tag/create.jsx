import {
  Button,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import axios from 'axios';
import { AlertCircleIcon } from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';
import { useSession } from '../../../providers/SessionProvider';

export default function TagCreateScreen() {
  const { control, handleSubmit } = useForm({ defaultValues: {} });
  const { session } = useSession();

  async function onSubmit(formData) {
    const postUri = `${process.env.EXPO_PUBLIC_BASE_URL}/tag`;
    const { data: response } = await axios.post(postUri, {
      clientJwt: session,
      data: formData,
    });

    console.log(response);
  }

  return (
    <VStack>
      <Controller
        control={control}
        name={'tagName'}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <FormControl
              size='md'
              isRequired
            >
              <FormControlLabel mb='$1'>
                <FormControlLabelText>Tag Name</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type='text'
                  value={value}
                  onChangeText={onChange}
                />
              </Input>
              <FormControlHelper>
                <FormControlHelperText>
                  Must be at least 6 characters.
                </FormControlHelperText>
              </FormControlHelper>
              {error && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    At least 6 characters are required.
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          );
        }}
      />
      <HStack>
        <FormControl>
          <Button onPress={handleSubmit(onSubmit)}>
            <ButtonText>Submit</ButtonText>
          </Button>
        </FormControl>
        <FormControl>
          <Button
            variant='outline'
            action='secondary'
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
        </FormControl>
      </HStack>
    </VStack>
  );
}
