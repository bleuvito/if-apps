import { useState } from 'react';
import { Checkbox } from 'react-native-paper';

export default function RoleBottomSheetListItem({
  role,
  isSelected,
  selectedRoles,
  setSelectedRoles,
}) {
  const [checked, setChecked] = useState(isSelected);

  const handlePress = () => {
    if (checked) {
      const filteredRoles = selectedRoles.filter((selectedRole) => {
        return selectedRole !== role;
      });
      setSelectedRoles(filteredRoles);
      setChecked(false);
    } else {
      setSelectedRoles([...selectedRoles, role]);
      setChecked(true);
    }
  };

  return (
    <Checkbox.Item
      status={checked ? 'checked' : 'unchecked'}
      label={role}
      onPress={handlePress}
    />
  );
}
