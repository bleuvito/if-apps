import { router, useLocalSearchParams } from 'expo-router';
import { Appbar } from 'react-native-paper';
import AnnouncementDetailsHeaderDeleteButton from './AnnouncementDetailsHeaderDeleteButton';
import AnnouncementDetailsHeaderPinButton from './AnnouncementDetailsHeaderPinButton';

export default function AnnouncementDetailsHeader({
  showFormDialog,
  hideFormDialog,
  goBack,
  isPinned,
}) {
  const { announcementId } = useLocalSearchParams();
  return (
    <>
      <Appbar.Action
        icon='history'
        onPress={() => router.push(`announcement/${announcementId}/history/`)}
      />
      <AnnouncementDetailsHeaderPinButton
        showFormDialog={showFormDialog}
        hideFormDialog={hideFormDialog}
        isPinned={isPinned}
      />
      <Appbar.Action
        icon='pencil'
        onPress={() => router.push(`announcement/${announcementId}/edit`)}
      />
      <AnnouncementDetailsHeaderDeleteButton
        showFormDialog={showFormDialog}
        hideFormDialog={hideFormDialog}
        goBack={goBack}
      />
    </>
  );
}
