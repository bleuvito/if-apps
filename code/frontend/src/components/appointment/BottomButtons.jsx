import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { Button } from 'react-native-paper';
import { useSession } from '../../providers/SessionProvider';

export default function BottomButtons({ status, userId, organizerId }) {
  const { session } = useSession();
  const { appointmentId } = useLocalSearchParams();

  if (status === 'ACCEPTED') {
    return null;
  }

  if (userId === organizerId) {
    if (status === 'DECLINED') {
      return <Button>Reschedule</Button>;
    }

    return null;
  }

  if (status === 'DECLINED') {
    return null;
  }

  return (
    <>
      <Button
        onPress={async () => {
          const putUri = `${process.env.EXPO_PUBLIC_BASE_URL}/appointment/${appointmentId}`;
          const data = { status: 'DECLINED' };
          const { data: response } = await axios.put(putUri, data, {
            headers: {
              Authorization: `Bearer ${session}`,
            },
          });
        }}
      >
        Decline
      </Button>
      <Button
        onPress={async () => {
          const putUri = `${process.env.EXPO_PUBLIC_BASE_URL}/appointment/${appointmentId}`;
          const data = { status: 'ACCEPTED' };
          const { data: response } = await axios.put(putUri, data, {
            headers: {
              Authorization: `Bearer ${session}`,
            },
          });
        }}
      >
        Accept
      </Button>
    </>
  );
}
