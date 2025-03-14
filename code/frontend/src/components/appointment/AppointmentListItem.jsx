import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Card, Icon, Text } from 'react-native-paper';

import { getTimeDuration } from '../../helpers/utils';
import LeftCalendarComponent from '../LeftCalendarIconComponent';
import StatusChip from '../StatusChip';

export default function AppointmentListItem({ appointment }) {
  return (
    <Card onPress={() => router.push(`appointment/${appointment.id}`)}>
      <Card.Content style={styles.container}>
        <LeftCalendarComponent date={appointment.start} />
        <View style={{ marginLeft: 12, paddingRight: 4 }}>
          <View style={styles.statusContainer}>
            <StatusChip data={appointment.status} />
          </View>
          <Text
            variant='titleLarge'
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {appointment.topic}
          </Text>
          <View style={styles.container}>
            <Icon source='clock-outline' />
            <Text
              variant='bodyMedium'
              style={styles.detailsText}
            >
              {getTimeDuration(appointment.start, appointment.end)}
            </Text>
          </View>
          <View style={styles.container}>
            <MaterialIcons name='place' />
            <Text
              variant='bodyMedium'
              style={styles.detailsText}
            >
              {appointment.place}
            </Text>
          </View>
          <View style={styles.container}>
            <Icon source='alpha-o' />
            <Text
              variant='bodyMedium'
              style={styles.detailsText}
            >
              {appointment.organizer.name}
            </Text>
          </View>
          <View style={styles.container}>
            <Icon source='alpha-p' />
            <Text
              variant='bodyMedium'
              style={styles.detailsText}
            >
              {appointment.participant.name}
            </Text>
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
  statusContainer: {
    marginBottom: 8,
  },
  detailsText: { marginLeft: 4 },
});
