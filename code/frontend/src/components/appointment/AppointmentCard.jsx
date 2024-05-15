import { A } from '@expo/html-elements';
import { router } from 'expo-router';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import LeftCalendarComponent from './LeftCalendarIconComponent';

export default function AppointmentCard({ appointment }) {
  const convertToString = (number) => {
    return number.toString().padStart(2, '0');
  };

  const getTimeString = (date) => {
    const hour = convertToString(date.getHours());
    const minute = convertToString(date.getMinutes());

    return `${hour}:${minute}`;
  };

  const getTimeDuration = () => {
    return `${getTimeString(new Date(appointment.startTime))}-${getTimeString(
      new Date(appointment.endTime)
    )}`;
  };

  return (
    <Card onPress={() => router.push(`appointment/${appointment.id}`)}>
      <Card.Content>
        <View style={styles.container}>
          <LeftCalendarComponent date={appointment.date} />
          <View style={styles.text}>
            <Text variant='titleLarge'>{appointment.topic}</Text>
            <View>
              <Text>{getTimeDuration()}</Text>
              <Text>{appointment.organizer.name}</Text>
              <Text>{appointment.participant.name}</Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flexDirection: 'column',
    paddingLeft: 8,
  },
});
