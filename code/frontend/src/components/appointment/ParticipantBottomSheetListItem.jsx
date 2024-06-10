import { Checkbox } from 'react-native-paper';

export default function ParticipantBottomSheetListItem({
  participant,
  selectedParticipant,
  setSelectedParticipant,
}) {
  const isSelected =
    selectedParticipant && selectedParticipant.id === participant.id;
  const handlePress = () => {
    if (isSelected) {
      setSelectedParticipant({});
    } else {
      setSelectedParticipant(participant);
    }
  };

  return (
    <Checkbox.Item
      status={isSelected ? 'checked' : 'unchecked'}
      label={participant.name}
      onPress={() => handlePress()}
    />
  );
}
