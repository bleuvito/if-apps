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
          title: 'Room',
        }}
      />
      <Stack.Screen
        name='create'
        options={{
          title: 'Create Room',
        }}
      />
      <Stack.Screen
        name='[roomId]'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
