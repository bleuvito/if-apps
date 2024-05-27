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
          title: 'Ruangan',
        }}
      />
      <Stack.Screen
        name='create'
        options={{
          title: 'Buat Ruangan',
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
