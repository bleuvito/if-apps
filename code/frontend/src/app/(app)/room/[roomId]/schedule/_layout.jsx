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
          title: 'Room Schedule',
        }}
      />
      <Stack.Screen
        name='create'
        options={{
          // headerShown: false,
          title: 'Create Room Schedule',
        }}
      />
      <Stack.Screen
        name='[roomScheduleId]'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
