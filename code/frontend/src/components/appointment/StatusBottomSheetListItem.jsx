import { useState } from 'react';
import { Checkbox } from 'react-native-paper';

export default function StatusBottomSheetListItem({
  status,
  isSelected,
  selectedStatuses,
  setSelectedStatuses,
}) {
  const [checked, setChecked] = useState(isSelected);

  const handlePress = () => {
    if (checked) {
      const filteredStatuses = selectedStatuses.filter((selectedStatus) => {
        return selectedStatus !== status;
      });
      setSelectedStatuses(filteredStatuses);
      setChecked(false);
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
      setChecked(true);
    }
  };

  return (
    <Checkbox.Item
      status={checked ? 'checked' : 'unchecked'}
      label={status}
      onPress={handlePress}
    />
  );
}
