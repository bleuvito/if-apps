import {
  Button,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import base64 from 'Base64';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import JWT from 'expo-jwt';
import { CircleAlert } from 'lucide-react-native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Platform } from 'react-native';
import Attachment from '../../../components/Attachment';
import Editor from '../../../components/Editor/Editor';
import { useSession } from '../../../providers/SessionProvider';

export default function AnnouncementCreateScreen() {
  const { session, signIn } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedFiles, setSelectedFiles] = useState([]);

  async function refreshToken() {
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

    return { user, googleAccessToken };
  }

  async function onSubmit(formData) {
    const { user, googleAccessToken } = await refreshToken();

    const fileDriveInfos = await uploadFiles();

    const encodedEmail = base64
      .btoa(
        `From: ${user.name} <${user.email}>\n` +
          `To: ${formData.recipientEmail}\n` +
          `Subject: ${formData.subject}\n` +
          `Content-Type: text/html; charset=UTF-8\n\n` +
          `${
            formData.body
          }<br/><strong>Lampiran</strong><br/>${fileDriveInfos.map(
            (fileDriveInfo) => {
              return `<a href=${fileDriveInfo.webViewLink}>${fileDriveInfo.name}</a><br />`;
            }
          )}`
      )
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    const body = {
      raw: encodedEmail,
    };

    headers = {
      Authorization: `Bearer ${googleAccessToken.token}`,
    };

    const uri = 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send';
    try {
      await axios.post(uri, body, { headers });
    } catch (error) {
      console.error('Error creating announcement: ', error);
    }
  }

  function onInvalid(errors) {
    console.error('Error submitting form: ', errors);
  }

  async function uploadFile(name, mimeType, fileContent) {
    const { googleAccessToken } = await refreshToken();
    const metadata = {
      name,
      mimeType,
    };

    const boundary = 'foo_baz_bar';
    const fileBody =
      `\n--${boundary}\n` +
      `Content-Type: application/json; charset=UTF-8\n\n` +
      `${JSON.stringify(metadata)}\n` +
      `\n--${boundary}\n` +
      `Content-Transfer-Encoding: base64\n` +
      `Content-Type: ${mimeType}\n\n` +
      `${fileContent}\n` +
      `\n--${boundary}--\n`;

    const contentLength = fileBody.length;

    const uploadHeaders = {
      Authorization: `Bearer ${googleAccessToken.token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
      'Content-Length': contentLength,
    };

    const uploadUri =
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
    try {
      const { data: uploadResponse } = await axios.post(uploadUri, fileBody, {
        headers: uploadHeaders,
      });

      const gDriveId = uploadResponse.id;

      const headers = {
        Authorization: `Bearer ${googleAccessToken.token}`,
      };
      const getUri = `https://www.googleapis.com/drive/v3/files/${gDriveId}?fields=id,name,size,webViewLink`;

      const { data: getResponse } = await axios.get(getUri, {
        headers,
      });

      const createPermissionUri = `https://www.googleapis.com/drive/v3/files/${getResponse.id}/permissions`;
      const permissionBody = {
        type: 'domain',
        domain: 'unpar.ac.id',
        role: 'reader',
      };

      await axios.post(createPermissionUri, permissionBody, { headers });

      return getResponse;
    } catch (error) {
      console.error('Error picking or uploading document: ', error.data);
    }
  }

  async function uploadFiles() {
    const fileDriveInfos = await Promise.all(
      selectedFiles.map(async (selectedFile) => {
        const { name, mimeType, uri, file } = selectedFile;
        if (Platform.OS === 'web') {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = async (ev) => {
            const fileContent = ev.target.result.split(',')[1];
            const fileDriveInfo = await uploadFile(name, mimeType, fileContent);

            return fileDriveInfo;
          };
        } else {
          const fileContent = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const fileDriveInfo = await uploadFile(name, mimeType, fileContent);
          await FileSystem.deleteAsync(uri);

          return fileDriveInfo;
        }
      })
    );

    return fileDriveInfos;
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
        defaultValue={''}
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
                // defaultValue={value}
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
        defaultValue={''}
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
                // defaultValue={value}
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
        defaultValue={''}
        render={({ field: { onChange, value } }) => (
          <FormControl size='md'>
            <FormControlLabel>
              <FormControlLabelText>Body</FormControlLabelText>
            </FormControlLabel>
            {Platform.OS === 'android' ? (
              <Editor
                value={value}
                onChange={onChange}
              />
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
      <Attachment
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
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
