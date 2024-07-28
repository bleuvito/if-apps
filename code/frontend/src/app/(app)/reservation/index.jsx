import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

import ReservationList from '../../../components/reservation/ReservationList';
import ReservationListControl from '../../../components/reservation/ReservationListControl';

export default function ReservationScreen() {
  const [search, setSearch] = useState('');
  const [statuses, setStatuses] = useState([]);

  return (
    <>
      <ReservationListControl
        setSearch={setSearch}
        setStatuses={setStatuses}
      />
      <ReservationList
        search={search}
        status={statuses}
      />
      <FAB
        icon='plus'
        style={styles.fab}
        onPress={() => router.push('reservation/create')}
      />
    </>
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
