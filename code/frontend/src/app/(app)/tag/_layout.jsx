import { Stack } from 'expo-router';
import BurgerMenuButton from '../../../components/BurgerMenuButton';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Tag',
          headerTitle: 'Tag',
          headerLeft: () => {
            return <BurgerMenuButton />;
          },
        }}
      />
    </Stack>
  );
}
