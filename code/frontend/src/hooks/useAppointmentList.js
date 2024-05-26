import axios from 'axios';

async function useAppointmentList(session, type, search, status) {
  const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/appointment`;
  try {
    const { data } = await axios.get(getUri, {
      headers: { Authorization: `Bearer ${session}` },
      params: {
        type,
        search,
        status,
      },
    });

    return data;
  } catch (error) {
    console.error('Error getting appointment list:', error);
  }
}

export { useAppointmentList };
