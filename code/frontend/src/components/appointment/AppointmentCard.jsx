import { A } from '@expo/html-elements';
import { router } from 'expo-router';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { getTimeDuration } from '../../helpers/utils';
import LeftCalendarComponent from './LeftCalendarIconComponent';

export default function AppointmentCard({ appointment }) {
  const { id, date, topic, startTime, endTime, organizer, participant } =
    appointment;

  return (
    <Card onPress={() => router.push(`appointment/${id}`)}>
      <Card.Content>
        <View style={styles.container}>
          <LeftCalendarComponent date={date} />
          <View style={styles.text}>
            <Text variant='titleLarge'>{topic}</Text>
            <View>
              <Text>{getTimeDuration(startTime, endTime)}</Text>
              <Text>{organizer.name}</Text>
              <Text>{participant.name}</Text>
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
