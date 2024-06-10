import { A } from '@expo/html-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Button, Card, Chip, Icon, Text } from 'react-native-paper';
import { getTimeDuration } from '../../helpers/utils';
import LeftCalendarComponent from '../LeftCalendarIconComponent';
import AppointmentStatusChip from './StatusChip';

export default function AppointmentListItem({ appointment }) {
  const {
    id,
    status,
    topic,
    start,
    end,
    organizer,
    participant,
    place,
    createdAt,
    updateAt,
  } = appointment;

  return (
    <Card onPress={() => router.push(`appointment/${id}`)}>
      <Card.Content>
        <View style={styles.container}>
          <LeftCalendarComponent date={start} />
          <View style={styles.text}>
            <View
              style={{
                marginBottom: 8,
              }}
            >
              <AppointmentStatusChip data={status} />
            </View>
            <Text
              variant='titleLarge'
              numberOfLines={1}
              ellipsizeMode='tail'
              style={{ marginBottom: 4 }}
            >
              {topic}
            </Text>
            <View style={{ gap: 2 }}>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}
              >
                <Icon source='clock-outline' />
                <Text variant='bodySmall'>{getTimeDuration(start, end)}</Text>
              </View>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}
              >
                <MaterialIcons name='place' />
                <Text variant='bodySmall'>{place}</Text>
              </View>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}
              >
                <Icon source='alpha-o' />
                <Text variant='bodySmall'>{organizer.name}</Text>
              </View>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}
              >
                <Icon source='alpha-p' />
                <Text variant='bodySmall'>{participant.name}</Text>
              </View>
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
    paddingLeft: 16,
  },
});
