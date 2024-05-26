import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';

import AppHeader from '../../../components/AppHeader';
import { AppointmentProvider } from '../../../providers/AppointmentProvider';

export default function Layout() {
  return (
    <AppointmentProvider>
      <Stack
        screenOptions={{
          header: (props) => <AppHeader {...props} />,
        }}
      >
        <Stack.Screen
          name='index'
          options={{
            title: 'Janji Temu',
          }}
        />
        <Stack.Screen
          name='create'
          options={{
            title: 'Buat Janji Temu',
          }}
        />
        <Stack.Screen
          name='[appointmentId]'
          options={{ headerShown: false }}
        />
      </Stack>
    </AppointmentProvider>
  );
}
