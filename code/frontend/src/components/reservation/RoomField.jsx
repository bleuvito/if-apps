import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

export default function RoomField({
  selectedRoom,
  setSelectedRoom,
  onPresentModalPress,
  onPresentAgendaModalPress,
}) {
  const handleDeleteSelectedParticipant = () => {
    setSelectedRoom({});
  };

  return (
    <>
      <View style={styles.label}>
        <Text>Room</Text>
        <Button onPress={() => onPresentAgendaModalPress()}>
          Lihat jadwal
        </Button>
      </View>
      <TextInput
        mode='outlined'
        editable={false}
        right={
          selectedRoom.name ? (
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
        value={selectedRoom.name || ''}
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
