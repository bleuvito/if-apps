import { FlatList, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useAppointment } from '../../providers/AppointmentProvider';
import AppointmentCard from './Card';

export default function AppointmentTabList({ appointments }) {
  // const { appointments, isLoading } = useAppointment();

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center' }}>
  //       <ActivityIndicator
  //         animating={true}
  //         size='large'
  //       />
  //     </View>
  //   );
  // }

  return (
    <FlatList
      data={appointments}
      // contentContainerStyle={styles.contentContainer}
      keyExtractor={(appointment, index) => appointment.id}
      renderItem={({ item }) => {
        return <AppointmentCard appointment={item} />;
      }}
    />
  );
}
