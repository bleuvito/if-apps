import { Text } from 'react-native-paper';
import AppointmentForm from '../../../components/appointment/AppointmentForm';

export default function AppointmentCreate() {
  const defaultValues = {
    topic: '',
    date: '',
    timeStart: undefined,
    timeEnd: undefined,
    participant: '',
  };

  return <AppointmentForm defaultValues={defaultValues} />;
}
