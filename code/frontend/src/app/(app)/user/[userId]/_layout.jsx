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
          title: 'Detail User',
        }}
      />
      <Stack.Screen
        name='edit'
        options={{
          title: 'Edit Detail User',
        }}
      />
    </Stack>
  );
}
