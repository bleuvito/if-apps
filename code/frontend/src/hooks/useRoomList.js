import axios from 'axios';

async function useRoomList(session, name) {
  const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/room`;
  try {
    const { data } = await axios.get(getUri, {
      headers: { Authorization: `Bearer ${session}` },
      params: {
        name,
      },
    });

    return data;
  } catch (error) {
    console.error('Error getting room list:', error);
  }
}

export { useRoomList };
