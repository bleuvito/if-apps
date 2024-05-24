import { useCallback } from 'react';
import { Checkbox } from 'react-native-paper';

export default function RoleCheckBox({
  currRole,
  selectedRole,
  setSelectedRole,
}) {
  const isSelected = currRole === selectedRole;

  const handlePress = useCallback(() => {
    if (isSelected) {
      setSelectedRole('');
    } else {
      setSelectedRole(currRole);
    }
  }, [currRole]);

  return (
    <Checkbox.Item
      status={isSelected ? 'checked' : 'unchecked'}
      label={currRole}
      onPress={() => handlePress()}
    />
  );
}
