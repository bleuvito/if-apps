import AppointmentForm from '../../../components/appointment/AppointmentForm';

export default function AppointmentCreate() {
  const defaultValues = {
    topic: '',
    date: '',
    timeStart: '',
    timeEnd: '',
  };

  return <AppointmentForm defaultValues={defaultValues} />;
}
