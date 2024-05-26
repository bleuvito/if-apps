import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useAppointmentList } from '../../hooks/useAppointmentList';
import { useSession } from '../../providers/SessionProvider';
import SearchInput from '../SearchInput';
import AppointmentStatusFilter from './AppointmentStatusFilter';
import AppointmentTabs from './AppointmentTabs';

export default function AppointmentListControl({
  appointments,
  setAppointments,
}) {
  const { session } = useSession();

  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [statuses, setStatuses] = useState([]);

  const getAppointments = async () => {
    setAppointments(await useAppointmentList(session, type, search, statuses));
  };

  useEffect(() => {
    getAppointments();
  }, [type, search, statuses]);

  return (
    <>
      <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <SearchInput setSearch={setSearch} />
      </View>
      <View style={{ paddingLeft: 16, paddingBottom: 8 }}>
        <AppointmentStatusFilter setStatuses={setStatuses} />
      </View>
      <AppointmentTabs
        appointments={appointments}
        setType={setType}
      />
    </>
  );
}
