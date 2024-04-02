import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { useSession } from '../providers/SessionProvider';
import { router } from 'expo-router';
import { scopes } from '../../constants';
import { useState } from 'react';
import { Platform } from 'react-native';

export default function SignIn() {
  const { signIn } = useSession();
  const [error, setError] = useState(null);

  let onSignIn;
  if (Platform.OS === 'web') {
    const { useGoogleLogin } = require('@react-oauth/google');

    onSignIn = useGoogleLogin({
      flow: 'auth-code',
      scope: scopes.join(' '),
      onSuccess: (response) => {
        console.log(response);
        signIn();
        router.replace('/');
      },
      onError: ({ error, error_description, error_uri }) => {
        console.error('Error authenticating user: ', error);
        setError(error_description);
      },
      onNonOAuthError: ({ type: errorType }) => {
        if (errorType === 'popup_closed') {
          setError('Pop up window is closed by user');
        } else if (errorType === 'popup_failed_to_open') {
          setError('Pop up window failed to open');
        } else {
          setError('Unknow error');
        }
      },
    });
  } else {
    onSignIn = () => {
      console.warn('Signin in on Android');

      signIn();
      router.replace('/');
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
          onSignIn();
        }}
      >
        <ButtonText>Sign in with Google</ButtonText>
      </Button>
    </Box>
  );
}
