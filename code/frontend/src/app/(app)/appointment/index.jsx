import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { TabsProvider } from 'react-native-paper-tabs';

import AppointmentListControl from '../../../components/appointment/AppointmentListControl';
import AppointmentTabs from '../../../components/appointment/AppointmentTabs';

export default function AppointmentScreen() {
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [statuses, setStatuses] = useState([]);

  return (
    <TabsProvider defaultIndex={0}>
      <AppointmentListControl
        setSearch={setSearch}
        setStatuses={setStatuses}
      />
      <AppointmentTabs
        setType={setType}
        searchType={type}
        search={search}
        status={statuses}
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
