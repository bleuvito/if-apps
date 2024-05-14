import AppointmentForm from '../../../components/appointment/AppointmentForm';

export default function AppointmentCreate() {
  const defaultValues = {
    topic: '',
    date: '',
    startTime: '',
    endTime: '',
  };

  return <AppointmentForm defaultValues={defaultValues} />;
}
