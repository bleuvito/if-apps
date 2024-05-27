import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import InputLabel from '../InputLabel';

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
    <View>
      <View style={styles.label}>
        <InputLabel
          isRequired={true}
          title='Partisipan'
        />
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
    </View>
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
