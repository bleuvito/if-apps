import { useEffect, useState } from 'react';
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
      <SearchInput setSearch={setSearch} />
      <AppointmentStatusFilter setStatuses={setStatuses} />
      <AppointmentTabs
        appointments={appointments}
        setType={setType}
      />
    </>
  );
}
