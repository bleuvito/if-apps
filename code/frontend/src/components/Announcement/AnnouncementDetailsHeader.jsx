import { router, useLocalSearchParams } from 'expo-router';
import { Appbar } from 'react-native-paper';
import AnnouncementDetailsHeaderDeleteButton from './AnnouncementDetailsHeaderDeleteButton';
import AnnouncementDetailsHeaderPinButton from './AnnouncementDetailsHeaderPinButton';

export default function AnnouncementDetailsHeader({
  showFormDialog,
  hideFormDialog,
  goBack,
  isPinned,
  role,
  userId,
  authorId,
}) {
  const { announcementId } = useLocalSearchParams();

  return (
    <>
      <Appbar.Action
        icon='history'
        onPress={() => router.push(`announcement/${announcementId}/history/`)}
      />
      {['ADMIN', 'KAJUR', 'KAPRODI'].includes(role) && (
        <AnnouncementDetailsHeaderPinButton
          showFormDialog={showFormDialog}
          hideFormDialog={hideFormDialog}
          isPinned={isPinned}
        />
      )}
      {(['ADMIN', 'KAJUR', 'KAPRODI'].includes(role) ||
        userId === authorId) && (
        <Appbar.Action
          icon='pencil'
          onPress={() => router.push(`announcement/${announcementId}/edit`)}
        />
      )}
      {['ADMIN', 'KAJUR', 'KAPRODI'].includes(role) && (
        <AnnouncementDetailsHeaderDeleteButton
          showFormDialog={showFormDialog}
          hideFormDialog={hideFormDialog}
          goBack={goBack}
        />
      )}
    </>
  );
}
