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
          title: 'Detail Ruangan',
        }}
      />
      <Stack.Screen
        name='edit'
        options={{
          title: 'Edit Ruangan',
        }}
      />
      <Stack.Screen
        name='schedule'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
