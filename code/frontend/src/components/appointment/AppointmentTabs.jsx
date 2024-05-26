import { View } from 'react-native';
import { TabScreen, Tabs } from 'react-native-paper-tabs';
import AppointmentTabList from './AppointmentTabList';

export default function AppointmentTabs({ appointments, setType }) {
  return (
    <>
      <Tabs>
        <TabScreen
          label='Semua'
          onPress={() => setType('')}
        >
          <View style={{ flex: 1 }}>
            <AppointmentTabList appointments={appointments} />
          </View>
        </TabScreen>
        <TabScreen
          label='Masuk'
          onPress={() => setType('participant')}
        >
          <View style={{ flex: 1 }}>
            <AppointmentTabList appointments={appointments} />
          </View>
        </TabScreen>
        <TabScreen
          label='Dikirim'
          onPress={() => setType('organizer')}
        >
          <View style={{ flex: 1 }}>
            <AppointmentTabList appointments={appointments} />
          </View>
        </TabScreen>
      </Tabs>
    </>
  );
}
