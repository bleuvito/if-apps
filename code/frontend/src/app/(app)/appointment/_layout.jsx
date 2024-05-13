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
          title: 'Appointment',
          headerTitle: 'Appointment',
        }}
      />
      <Stack.Screen
        name='create'
        options={{
          title: 'Appointment Create',
        }}
      />
      <Stack.Screen name='[appointmentId]' />
    </Stack>
  );
}
