import { View } from 'react-native';
import { TabScreen, Tabs } from 'react-native-paper-tabs';
import AppointmentTabList from './AppointmentTabList';

export default function AppointmentTabs({
  setType,
  searchType,
  search,
  status,
}) {
  return (
    <>
      <Tabs disableSwipe={true}>
        <TabScreen
          label='Semua'
          onPress={() => setType('')}
        >
          <View style={{ flex: 1 }}>
            <AppointmentTabList
              type={''}
              searchType={searchType}
              search={search}
              status={status}
            />
          </View>
        </TabScreen>
        <TabScreen
          label='Masuk'
          onPress={() => setType('participant')}
        >
          <View style={{ flex: 1 }}>
            <AppointmentTabList
              type={'participant'}
              searchType={searchType}
              search={search}
              status={status}
            />
          </View>
        </TabScreen>
        <TabScreen
          label='Dikirim'
          onPress={() => setType('organizer')}
        >
          <View style={{ flex: 1 }}>
            <AppointmentTabList
              type={'organizer'}
              searchType={searchType}
              search={search}
              status={status}
            />
          </View>
        </TabScreen>
      </Tabs>
    </>
  );
}
