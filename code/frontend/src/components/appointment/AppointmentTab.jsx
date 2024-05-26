import { useCallback } from 'react';
import { View } from 'react-native';
import { TabScreen } from 'react-native-paper-tabs';
import { useAppointment } from '../../providers/AppointmentProvider';
import AppointmentSearchInput from './AppointmentSearchInput';
import AppointmentTabList from './AppointmentTabList';

export default function AppointmentTab({ label, type }) {
  const { setType } = useAppointment();

  // const handleTabPress = (type) => handleTypeChange(type);

  return (
    <TabScreen
      label={label}
      onPress={() => setType(type)}
    >
      <View style={{ flex: 1 }}>
        <AppointmentTabList />
      </View>
    </TabScreen>
  );
}
