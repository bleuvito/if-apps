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
          title: 'Announcement History',
        }}
      />
      <Stack.Screen
        name='[historyId]'
        options={{
          title: 'Announcement History Details',
        }}
      />
    </Stack>
  );
}
