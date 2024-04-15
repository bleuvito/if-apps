import { Stack } from 'expo-router';
import BurgerMenuButton from '../../../components/BurgerMenuButton';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Announcement',
          headerTitle: 'Announcement',
          headerLeft: () => {
            return <BurgerMenuButton />;
          },
        }}
      />
      <Stack.Screen
        name='[id]'
        options={{
          headerTitle: 'Announcement Details',
        }}
      />
    </Stack>
  );
}
