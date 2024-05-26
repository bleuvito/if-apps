import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { TabsProvider } from 'react-native-paper-tabs';
import AppointmentListControl from '../../../components/appointment/AppointmentListControl';
import { useAppointmentList } from '../../../hooks/useAppointmentList';
import { useSession } from '../../../providers/SessionProvider';

export default function AppointmentScreen() {
  const { session } = useSession();
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    setAppointments(await useAppointmentList(session, '', '', undefined));
  };

  useFocusEffect(
    useCallback(() => {
      getAppointments();
    }, [])
  );

  return (
    <TabsProvider defaultIndex={0}>
      <AppointmentListControl
        appointments={appointments}
        setAppointments={setAppointments}
      />
      <FAB
        icon='plus'
        style={styles.fab}
        onPress={() => router.push('appointment/create')}
      />
    </TabsProvider>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
