import axios from 'axios';
import JWT from 'expo-jwt';
import base64 from 'Base64';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  ButtonText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  Textarea,
  TextareaInput,
  VStack,
} from '@gluestack-ui/themed';
import { FormControl } from '@gluestack-ui/themed';
import { CircleAlert } from 'lucide-react-native';
import { useSession } from '../../../providers/SessionProvider';

export default function AnnouncementCreateScreen() {
  const { session, signIn } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(formData) {
    try {
      console.log('Collected form data: ', formData);

      const { data: serverTokenResponse } = await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_URL}/tokens`,
        {
          clientJwt: session,
        }
      );

      const { data: serverToken } = serverTokenResponse;
      const { user, googleAccessToken } = JWT.decode(
        serverToken,
        'LK20+/B?Ey-r%4:F9<-A+,!CHxp4zmVG_~$_Lih5A!r^,CXJ'
      );
      signIn(serverToken);

      const encodedEmail = base64
        .btoa(
          `From: ${user.email}\r\n` +
            `To: ${formData.recipientEmail}\r\n` +
            `Subject: ${formData.subject}\r\n` +
            `Content-Type: text/html; charset=UTF-8\r\n\r\n` +
            `${formData.body}`
          // `<p>This is the <strong>HTML</strong> version of the message.</p><ul><li>One</li><li>Two</li></ul>`
        )
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

      const sendEmailResponse = await axios.post(
        'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
        {
          raw: encodedEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${googleAccessToken.token}`,
          },
        }
      );

      console.log('Sending email response: ', sendEmailResponse);
    } catch (error) {
      console.error('Error creating announcement: ', error);
    }
  }

  function onInvalid(errors) {
    console.error('Error submitting form: ', errors);
  }

  return (
    <VStack>
      <Controller
        name='recipientEmail'
        // rules={{
        //   required: 'Recipient email cannot empty',
        //   required: true,
        //   pattern: {
        //     value: /^\S+@\S+$/i,
        //     message: 'Enter a valid email address',
        //   },
        // }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControl
            size='md'
            isRequired
          >
            <FormControlLabel>
              <FormControlLabelText>Recipient Email</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type='text'
                defaultValue=''
                onChangeText={onChange}
                value={value}
              />
            </Input>
            {errors.recipientEmail && (
              <FormControlError>
                <FormControlErrorIcon as={CircleAlert} />
                <FormControlErrorText>
                  {errors.recipientEmail.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />
      <Controller
        name='subject'
        // rules={{ required: 'Subject cannot empty' }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControl
            size='md'
            isRequired
          >
            <FormControlLabel>
              <FormControlLabelText>Subject</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type='text'
                defaultValue=''
                value={value}
                onChangeText={onChange}
              />
            </Input>
            {errors.subject && (
              <FormControlError>
                <FormControlErrorIcon as={CircleAlert} />
                <FormControlErrorText>
                  {errors.subject.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />
      <Controller
        name='body'
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControl size='md'>
            <FormControlLabel>
              <FormControlLabelText>Body</FormControlLabelText>
            </FormControlLabel>
            <Textarea>
              <TextareaInput
                onChangeText={onChange}
                value={value}
              />
            </Textarea>
            {errors.body && (
              <FormControlError>
                <FormControlErrorIcon as={CircleAlert} />
                <FormControlErrorText>
                  {errors.body.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />
      <HStack>
        <FormControl>
          <Button onPress={handleSubmit(onSubmit, onInvalid)}>
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
