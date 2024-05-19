import dayjs from 'dayjs';
import id from 'dayjs/locale/id';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

export default function CalendarToolbar({ selectedDate, setSelectedDate }) {
  const handlePress = async (operator) => {
    const newDate = dayjs(selectedDate).locale('id').add(operator, 'week');
    setSelectedDate(newDate);
  };

  return (
    <View style={styles.controller}>
      <IconButton
        icon='chevron-left'
        onPress={() => {
          handlePress(-1);
        }}
      />
      <Text variant='titleLarge'>{dayjs(selectedDate).format('MMM YYYY')}</Text>
      <IconButton
        icon='chevron-right'
        onPress={() => {
          handlePress(1);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  controller: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 64,
  },
  debug: {
    borderWidth: 1,
    borderColor: 'red',
  },
});
