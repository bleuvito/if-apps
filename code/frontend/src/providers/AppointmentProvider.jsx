import { createContext, useContext, useEffect, useState } from 'react';

const AppointmentContext = createContext({
  type: '',
  setType: (type) => null,
  search: '',
  setSearch: (search) => null,
  filter: [],
  setFilter: (filter) => null,
  isLoading: false,
  setIsLoading: (isLoading) => null,
  appointments: [],
  setAppointments: () => null,
});

export function useAppointment() {
  return useContext(AppointmentContext);
}

export function AppointmentProvider({ children }) {
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const getAppointment = async () => {
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/appointment`;
    try {
      // const data = await axios.get(getUri, {
      //   headers: { Authorization: `Bearer ${session}` },
      //   params: {
      //     type,
      //     search,
      //     filter,
      //   },
      // });
      // console.log(data);

      setIsLoading(true);
      setTimeout(() => {
        console.log('loading');
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAppointment();
  }, [type, search, filter]);

  return (
    <AppointmentContext.Provider
      value={{
        setType,
        search,
        setSearch,
        filter,
        setFilter,
        isLoading,
        appointments,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}
