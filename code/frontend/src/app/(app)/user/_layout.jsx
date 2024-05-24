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
          title: 'User',
        }}
      />
      <Stack.Screen
        name='create'
        options={{
          title: 'Create User',
        }}
      />
      <Stack.Screen
        name='[userId]'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
