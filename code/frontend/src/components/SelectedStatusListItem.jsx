import { useCallback } from 'react';
import { Chip } from 'react-native-paper';

export default function SelectedStatusListItem({
  status,
  selectedStatuses,
  setSelectedStatuses,
}) {
  const handlePressClose = useCallback(() => {
    const filteredStatuses = selectedStatuses.filter((selectedStatus) => {
      return status !== selectedStatus;
    });

    setSelectedStatuses(filteredStatuses);
  }, [selectedStatuses]);

  return (
    <Chip
      closeIcon='close'
      onClose={() => handlePressClose()}
    >
      {status}
    </Chip>
  );
}
