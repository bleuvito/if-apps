import axios from 'axios';

async function useTagList(session) {
  const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/tag`;
  try {
    const { data } = await axios.get(getUri, {
      headers: { Authorization: `Bearer ${session}` },
    });

    return data;
  } catch (error) {
    console.error('Error getting tag list:', error);
  }
}

export { useTagList };
