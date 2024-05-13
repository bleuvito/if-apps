import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { TabScreen, Tabs, TabsProvider } from 'react-native-paper-tabs';
import AppointmentTab from '../../../components/appointment/AppointmentTab';

export default function Example() {
  return (
    <TabsProvider defaultIndex={0}>
      <Tabs>
        <TabScreen label='All'>
          <AppointmentTab />
        </TabScreen>
        <TabScreen label='Inbox'>
          <AppointmentTab />
        </TabScreen>
        <TabScreen label='Sent'>
          <AppointmentTab />
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
