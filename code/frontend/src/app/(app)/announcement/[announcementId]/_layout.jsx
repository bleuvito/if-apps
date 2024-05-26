import { Stack } from 'expo-router';

import AppHeader from '../../../../components/AppHeader';

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
          title: null,
        }}
      />
      <Stack.Screen
        name='edit'
        options={{
          title: 'Edit Pengumuman',
        }}
      />
      <Stack.Screen
        name='history'
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
