import { useState } from 'react';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';
import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { useSession } from '../providers/SessionProvider';
import { scopes } from '../constants';

export default function SignInScreen() {
  const { signIn } = useSession();
  const [error, setError] = useState(null);

  async function backendAuth(code, clientType) {
    const { data } = await axios.post(
      `${process.env.EXPO_PUBLIC_BASE_URL}/authenticate`,
      {
        code,
        clientType,
      }
    );

    return data;
  }

  let handleSignIn;
  if (Platform.OS === 'web') {
    const { useGoogleLogin } = require('@react-oauth/google');

    handleSignIn = useGoogleLogin({
      flow: 'auth-code',
      scope: scopes.join(' '),
      onSuccess: async ({ code }) => {
        console.log(
          'Google authentication code from web: ',
          JSON.stringify(code, null, 2)
        );

        const { success, errorCode, message, data } = await backendAuth(
          code,
          'web'
        );

        if (success) {
          signIn(data);
          router.replace('/');
        }
      },
      onError: ({ error, error_description }) => {
        console.error('Error authenticating user: ', error);
        setError(error_description);
      },
      onNonOAuthError: ({ type: errorType }) => {
        if (errorType === 'popup_closed') {
          setError('Pop up window is closed by user');
        } else if (errorType === 'popup_failed_to_open') {
          setError('Pop up window failed to open');
        } else {
          setError('Unknow error on web sign in');
        }
        console.error('Error signing in user on web: ', errorType);
      },
    });
  } else {
    const {
      GoogleSignin,
      statusCodes,
    } = require('@react-native-google-signin/google-signin');

    handleSignIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();

        const { serverAuthCode } = await GoogleSignin.signIn();
        console.log(
          'Serverauth code response from Android Google authentication on Android:',
          JSON.stringify(serverAuthCode, null, 2)
        );

        const { success, errorCode, message, data } = await backendAuth(
          serverAuthCode,
          'android'
        );

        if (success) {
          signIn(data);
          router.replace('/');
        }
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          setError('Sign in is cancelled by the user');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          setError('Sign in is in process already');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          setError('Google Play Service is outdated or unavailable');
        } else {
          setError('Unknow error on Android sign in');
        }
        console.error('Error signing in user on Android: ', error);
      }
    };
  }

  return (
    <Box
      width='100%'
      height='100%'
      justifyContent='center'
      alignItems='center'
    >
      <Text>{error}</Text>
      <Button
        onPress={() => {
          handleSignIn();
        }}
      >
        <ButtonText>Sign in with Google</ButtonText>
      </Button>
    </Box>
  );
}
