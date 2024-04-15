import { useState } from 'react';
import { Box, Text } from '@gluestack-ui/themed';
import SignInWithGoogleButton from '../components/SignInWithGoogleButton';

export default function SignInScreen() {
  const [error, setError] = useState(null);

  return (
    <Box
      width='100%'
      height='100%'
      justifyContent='center'
      alignItems='center'
    >
      <Text>{error}</Text>
      <SignInWithGoogleButton handleError={setError} />
    </Box>
  );
}
