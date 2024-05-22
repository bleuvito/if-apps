import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

export default function AppointmentParticipantField({
  selectedParticipant,
  setSelectedParticipant,
  onPresentModalPress,
  onPresentAgendaModalPress,
}) {
  const handleDeleteSelectedParticipant = () => {
    setSelectedParticipant({});
  };

  return (
    <>
      <View style={styles.label}>
        <Text>Participant</Text>
        <Button onPress={() => onPresentAgendaModalPress()}>
          Lihat jadwal
        </Button>
      </View>
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

const styles = StyleSheet.create({
  label: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
