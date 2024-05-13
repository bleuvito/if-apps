import { View } from 'react-native';
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
    </TabsProvider>
  );
}
