import { Stack } from 'expo-router';
import BurgerMenuButton from '../../../components/BurgerMenuButton';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Appointment',
          headerTitle: 'Appointment',
          headerLeft: () => {
            return <BurgerMenuButton />;
          },
        }}
      />
    </Stack>
  );
}
