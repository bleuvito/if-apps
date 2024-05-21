import { Checkbox } from 'react-native-paper';

export default function DayCheckbox({ room, selectedRoom, setSelectedRoom }) {
  const isSelected = room && selectedRoom.id === room.id;
  const handlePress = () => {
    if (isSelected) {
      setSelectedRoom({});
    } else {
      setSelectedRoom(room);
    }
  };

  return (
    <Checkbox.Item
      status={isSelected ? 'checked' : 'unchecked'}
      label={room.name}
      onPress={() => handlePress()}
    />
  );
}
