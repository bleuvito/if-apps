import axios from 'axios';

async function useReservationList(session, title) {
  const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/reservation`;
  try {
    const { data } = await axios.get(getUri, {
      headers: { Authorization: `Bearer ${session}` },
      params: { title },
    });

    return data;
  } catch (error) {
    console.error('Error getting announcement list:', error);
  }
}

export { useReservationList };
