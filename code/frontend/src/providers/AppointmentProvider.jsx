import { createContext, useContext, useEffect, useState } from 'react';
import { useAppointmentList } from '../hooks/useAppointmentList';
import { useSession } from './SessionProvider';

const AppointmentContext = createContext();

export function useAppointment() {
  return useContext(AppointmentContext);
}

export function AppointmentProvider({ children }) {
  const { session } = useSession();

  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);

  const getAppointments = async () => {
    setIsLoading(true);
    setAppointments(await useAppointmentList(session, type, search, filter));
    setIsLoading(false);
  };

  useEffect(() => {
    getAppointments();
    console.log(appointments);
  }, [type, search, filter]);

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        isLoading,
        type,
        setType,
        setSearch,
        setFilter,
        getAppointments,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}
