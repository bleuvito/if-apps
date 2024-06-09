import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Appbar } from 'react-native-paper';
import { useSession } from '../../providers/SessionProvider';

export default function AnnouncementDetailsHeaderPinButton({
  showFormDialog,
  hideFormDialog,
  isPinned,
}) {
  const { session } = useSession();
  const { announcementId } = useLocalSearchParams();
  const [isAnnouncementPinned, setIsAnnouncementPinned] = useState(isPinned);

  async function handleTogglePin() {
    const patchUri = `${process.env.EXPO_PUBLIC_BASE_URL}/announcement/${announcementId}/pin`;
    try {
      showFormDialog();
      const { data } = await axios.patch(
        patchUri,
        {
          isPinned: !isAnnouncementPinned,
        },
        {
          headers: { Authorization: `Bearer ${session}` },
        }
      );

      setIsAnnouncementPinned(!isAnnouncementPinned);
    } catch (error) {
      console.error('Error toggle pin announcement: ', error);
    } finally {
      hideFormDialog();
    }
  }

  return (
    <>
      <Appbar.Action
        icon={isAnnouncementPinned ? 'pin-off' : 'pin'}
        onPress={handleTogglePin}
      />
    </>
  );
}
