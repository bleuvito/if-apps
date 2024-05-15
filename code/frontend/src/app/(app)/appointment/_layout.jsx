import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';

import AppHeader from '../../../components/AppHeader';
import { AppointmentProvider } from '../../../providers/AppointmentProvider';

export default function Layout() {
  return (
    <BottomSheetModalProvider>
      <Stack
        screenOptions={{
          header: (props) => <AppHeader {...props} />,
        }}
      >
        {/* <AppointmentProvider> */}
        <Stack.Screen
          name='index'
          options={{
            title: 'Appointment',
            headerTitle: 'Appointment',
          }}
        />
        {/* </AppointmentProvider> */}
        <Stack.Screen
          name='create'
          options={{
            title: 'Appointment Create',
          }}
        />
        <Stack.Screen name='[appointmentId]' />
      </Stack>
    </BottomSheetModalProvider>
  );
}
