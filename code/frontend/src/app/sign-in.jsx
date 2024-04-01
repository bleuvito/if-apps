import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import { useSession } from '../providers/AuthProvider';
import { router } from 'expo-router';

export default function SignIn() {
  const { signIn } = useSession();

  return (
    <Box
      width='100%'
      height='100%'
      justifyContent='center'
      alignItems='center'
    >
      <Button
        onPress={() => {
          signIn();
          router.replace('/');
        }}
      >
        <ButtonText>Sign in with Google</ButtonText>
      </Button>
    </Box>
  );
}
