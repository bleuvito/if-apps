import { Text, TextInput } from 'react-native-paper';

export default function AppointmentParticipantField({
  selectedParticipant,
  setSelectedParticipant,
  onPresentModalPress,
}) {
  const handleDeleteSelectedParticipant = () => {
    setSelectedParticipant({});
  };

  return (
    <>
      <Text>Participant</Text>
      <TextInput
        mode='outlined'
        editable={false}
        right={
          selectedParticipant.name ? (
            <TextInput.Icon
              icon='close'
              onPress={() => handleDeleteSelectedParticipant()}
            />
          ) : (
            <TextInput.Icon
              icon='plus'
              onPress={() => onPresentModalPress()}
            />
          )
        }
        value={selectedParticipant.name || ''}
      />
    </>
  );
}
