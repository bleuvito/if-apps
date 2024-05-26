import { FlatList, View } from 'react-native';
import { useSession } from '../../providers/SessionProvider';
import AppointmentCard from './Card';

export default function AppointmentTabList({ appointments }) {
  const { getUserId } = useSession();

  return (
    <FlatList
      data={appointments}
      keyExtractor={(appointment, index) => appointment.id}
      contentContainerStyle={{ gap: 16, padding: 16, paddingBottom: 48 }}
      renderItem={({ item }) => {
        return <AppointmentCard appointment={item} />;
      }}
    />
  );
}
