import { Stack } from 'expo-router';
import AppHeader from '../../../components/AppHeader';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <AppHeader {...props} />,
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          title: 'Schedule',
        }}
      />
      <Stack.Screen
        name='create'
        options={{
          // headerShown: false,
          title: 'Create Schedule',
        }}
      />
    </Stack>
  );
}
