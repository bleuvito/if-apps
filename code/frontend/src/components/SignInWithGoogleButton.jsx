import { Button, ButtonText } from '@gluestack-ui/themed';
import axios from 'axios';
import { router } from 'expo-router';
import { Platform } from 'react-native';
import { scopes } from '../constants';
import { useSession } from '../providers/SessionProvider';

export default function SignInWithGoogleButton({ handleError }) {
  const { signIn } = useSession();

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
        handleError(error_description);
      },
      onNonOAuthError: ({ type: errorType }) => {
        if (errorType === 'popup_closed') {
          handleError('Pop up window is closed by user');
        } else if (errorType === 'popup_failed_to_open') {
          handleError('Pop up window failed to open');
        } else {
          handleError('Unknow error on web sign in');
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
          handleError('Sign in is cancelled by the user');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          handleError('Sign in is in process already');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          handleError('Google Play Service is outdated or unavailable');
        } else {
          handleError('Unknow error on Android sign in');
        }
        console.error('Error signing in user on Android: ', error);
      }
    };
  }

  return (
    <Button
      onPress={() => {
        handleSignIn();
      }}
    >
      <ButtonText>Sign in with Google</ButtonText>
    </Button>
  );
}
