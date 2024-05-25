import axios from 'axios';

async function useAnnouncementList(session, subject, tags) {
  const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/announcement`;
  try {
    const { data } = await axios.get(getUri, {
      headers: { Authorization: `Bearer ${session}` },
      params: { subject, tags },
    });

    return data;
  } catch (error) {
    console.error('Error getting announcement list:', error);
  }
}

export { useAnnouncementList };
