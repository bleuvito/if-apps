import { useCallback, useRef } from 'react';
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
  FormControl,
  HStack,
  Input,
  InputField,
  VStack,
  Text,
} from '@gluestack-ui/themed';
import {
  RichEditor,
  RichToolbar,
  actions,
} from 'react-native-pell-rich-editor';
import { CircleAlert } from 'lucide-react-native';
import { useSession } from '../../../providers/SessionProvider';
import { Platform } from 'react-native';
import Editor from '../../../components/Editor.jsx';

export default function AnnouncementCreateScreen() {
  const { session, signIn } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      recipientEmail: '',
      subject: '',
      body: '',
    },
  });
  const richEditor = useRef();
  const content = useRef('');

  const handleChange = useCallback((html) => {
    content.current = html;
  }, []);

  // let Editor;
  // if (Platform.OS === 'web') {
  //   Editor = require('../../../components/Editor.jsx');
  // }

  async function onSubmit(formData) {
    try {
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
        )
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

      await axios.post(
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
        // rules={{ required: 'Subject cannot empty' }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControl size='md'>
            <FormControlLabel>
              <FormControlLabelText>Body</FormControlLabelText>
            </FormControlLabel>
            {Platform.OS === 'android' ? (
              <>
                <RichToolbar
                  editor={richEditor}
                  actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.setUnderline,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                    actions.insertLink,
                  ]}
                />
                <RichEditor
                  ref={richEditor}
                  initialContentHTML={value}
                  onChange={onChange}
                />
                <Text>{value}</Text>
              </>
            ) : (
              <div>
                <Editor
                  value={value}
                  onChange={onChange}
                />
              </div>
            )}
          </FormControl>
        )}
      />
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Attachment</FormControlLabelText>
        </FormControlLabel>
      </FormControl>
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
