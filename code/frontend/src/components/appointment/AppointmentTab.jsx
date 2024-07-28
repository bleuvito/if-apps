import { View } from 'react-native';
import { TabScreen } from 'react-native-paper-tabs';
import { useAppointment } from '../../providers/AppointmentProvider';
import AppointmentList from './AppointmentList';

export default function AppointmentTab({
  label,
  type,
  searchType,
  search,
  status,
}) {
  const { setType } = useAppointment();

  return (
    <TabScreen
      label={label}
      onPress={() => setType(type)}
    >
      <View style={{ flex: 1 }}>
        <AppointmentList
          type={type}
          searchType={searchType}
          search={search}
          status={status}
        />
      </View>
    </TabScreen>
  );
}
