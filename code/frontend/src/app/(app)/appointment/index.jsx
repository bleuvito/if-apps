import axios from 'axios';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import {
  TabScreen,
  Tabs,
  TabsProvider,
  useTabIndex,
} from 'react-native-paper-tabs';
import AppointmentTab from '../../../components/appointment/AppointmentTab';
import { useSession } from '../../../providers/SessionProvider';

export default function AppointmentScreen() {
  const { session } = useSession();

  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const getAppointment = async () => {
    setIsLoading(true);

    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/appointment`;
    try {
      const { data } = await axios.get(getUri, {
        headers: { Authorization: `Bearer ${session}` },
        params: {
          type,
          search,
          filter,
        },
      });

      setAppointments(data);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getAppointment();
  }, [type, search, filter]);

  return (
    <TabsProvider
      defaultIndex={0}
      onChangeIndex={() => {}}
    >
      <Tabs>
        <TabScreen
          label='All'
          onPress={() => setType('')}
        >
          <AppointmentTab
            appointments={appointments}
            isLoading={isLoading}
            onSearch={setSearch}
            onFilter={setFilter}
          />
        </TabScreen>
        <TabScreen
          label='Inbox'
          onPress={() => setType('participant')}
        >
          <AppointmentTab
            appointments={appointments}
            onSearch={setSearch}
            onFilter={setFilter}
            isLoading={isLoading}
          />
        </TabScreen>
        <TabScreen
          label='Sent'
          onPress={() => setType('organizer')}
        >
          <AppointmentTab
            appointments={appointments}
            onSearch={setSearch}
            onFilter={setFilter}
            isLoading={isLoading}
          />
        </TabScreen>
      </Tabs>
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
