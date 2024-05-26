import axios from 'axios';

async function useUserList(session, name, role) {
  const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/user`;
  try {
    const { data } = await axios.get(getUri, {
      headers: { Authorization: `Bearer ${session}` },
      params: {
        name,
        role,
      },
    });

    return data;
  } catch (error) {
    console.error('Error getting appointment list:', error);
  }
}

export { useUserList };
