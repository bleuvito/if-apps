import { Redirect, Stack } from 'expo-router';
import { useSession } from '../../providers/SessionProvider';
import { Text } from '@gluestack-ui/themed';

export default function Layout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href={'/sign-in'} />;
  }

  return <Stack />;
}
