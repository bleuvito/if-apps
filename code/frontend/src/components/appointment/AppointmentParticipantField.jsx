import { StyleSheet, View } from 'react-native';
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
        // disabled={editMode}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
