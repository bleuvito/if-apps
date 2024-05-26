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
          title: 'Pengumuman',
        }}
      />
      <Stack.Screen
        name='[announcementId]'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='create'
        options={{
          title: 'Buat Pengumuman',
        }}
      />
    </Stack>
  );
}
