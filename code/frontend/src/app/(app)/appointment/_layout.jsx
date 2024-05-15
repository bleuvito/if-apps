import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';

import AppHeader from '../../../components/AppHeader';

export default function Layout() {
  return (
    <BottomSheetModalProvider>
      <Stack
        screenOptions={{
          header: (props) => <AppHeader {...props} />,
        }}
      >
        <Stack.Screen
          name='index'
          options={{
            title: 'Appointment',
          }}
        />
        <Stack.Screen
          name='create'
          options={{
            title: 'Appointment Create',
          }}
        />
        <Stack.Screen
          name='[appointmentId]'
          options={{ title: null }}
        />
      </Stack>
    </BottomSheetModalProvider>
  );
}
