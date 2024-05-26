import { Stack } from 'expo-router';

import AppHeader from '../../../../../components/AppHeader';

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
          title: 'Histori Pengumuman',
        }}
      />
      <Stack.Screen
        name='[historyId]'
        options={{
          title: 'Detail Histori Pengumuman',
        }}
      />
    </Stack>
  );
}
