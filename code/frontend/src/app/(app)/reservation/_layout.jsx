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
          title: 'Pinjaman Ruangan',
        }}
      />
      <Stack.Screen
        name='create'
        options={{
          title: 'Buat Pinjaman Ruangan',
        }}
      />
      <Stack.Screen
        name='[reservationId]'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
