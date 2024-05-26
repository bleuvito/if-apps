import { useCallback } from 'react';
import { Chip } from 'react-native-paper';

export default function SelectedUserRoleListItem({
  role,
  selectedRoles,
  setSelectedRoles,
}) {
  const handlePressClose = useCallback(() => {
    const filteredRoles = selectedRoles.filter((selectedRole) => {
      return role !== selectedRole;
    });

    setSelectedRoles(filteredRoles);
  }, [selectedRoles]);

  return (
    <Chip
      closeIcon='close'
      onClose={() => handlePressClose()}
    >
      {role}
    </Chip>
  );
}
