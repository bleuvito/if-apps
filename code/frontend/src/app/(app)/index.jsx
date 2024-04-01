import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import { useSession } from '../../providers/AuthProvider';

export default function App() {
  const { signOut } = useSession();

  return (
    <Box
      width='100%'
      height='100%'
      justifyContent='center'
      alignItems='center'
    >
      <Button
        onPress={() => {
          signOut();
          router.replace('/');
        }}
      >
        <ButtonText>Sign out</ButtonText>
      </Button>
    </Box>
  );
}
