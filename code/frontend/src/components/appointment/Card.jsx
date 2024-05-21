import { A } from '@expo/html-elements';
import { router } from 'expo-router';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Button, Card, Chip, Text } from 'react-native-paper';
import { getTimeDuration } from '../../helpers/utils';
import LeftCalendarComponent from '../LeftCalendarIconComponent';
import AppointmentStatusChip from './StatusChip';

export default function AppointmentCard({ appointment }) {
  const {
    id,
    status,
    topic,
    start,
    end,
    organizer,
    participant,
    createdAt,
    updateAt,
  } = appointment;

  return (
    <Card onPress={() => router.push(`appointment/${id}`)}>
      <Card.Content>
        <View style={styles.container}>
          <LeftCalendarComponent date={start} />
          <View style={styles.text}>
            <AppointmentStatusChip data={status} />
            <Text
              variant='titleLarge'
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {topic}
            </Text>
            <View>
              <Text>{getTimeDuration(start, end)}</Text>
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
