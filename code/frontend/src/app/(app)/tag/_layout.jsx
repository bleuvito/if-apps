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
          title: 'Tag',
        }}
      />
      <Stack.Screen
        name='create'
        options={{
          title: 'Buat Tag',
        }}
      />
      <Stack.Screen
        name='[tagId]'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
