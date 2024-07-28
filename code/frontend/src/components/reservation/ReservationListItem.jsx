import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Card, Icon, Text } from 'react-native-paper';

import { getTimeDuration } from '../../helpers/utils';
import LeftCalendarComponent from '../LeftCalendarIconComponent';
import StatusChip from '../StatusChip';

export default function ReservationListItem({ reservation }) {
  return (
    <Card
      onPress={() => {
        router.push(`reservation/${reservation.id}`);
      }}
    >
      <Card.Content style={styles.container}>
        <LeftCalendarComponent date={reservation.start} />
        <View style={{ marginLeft: 12 }}>
          <View style={styles.statusContainer}>
            <StatusChip data={reservation.status} />
          </View>
          <Text
            variant='titleLarge'
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {reservation.title}
          </Text>
          <View style={styles.container}>
            <Icon source='clock-outline' />
            <Text
              variant='bodyMedium'
              style={styles.detailsText}
            >
              {getTimeDuration(reservation.start, reservation.end)}
            </Text>
          </View>
          <View style={styles.container}>
            <MaterialIcons name='location-pin' />
            <Text
              variant='bodyMedium'
              style={styles.detailsText}
            >
              {reservation.room.name}
            </Text>
          </View>
          <View style={styles.container}>
            <Icon source='account' />
            <Text
              variant='bodyMedium'
              style={styles.detailsText}
            >
              {reservation.reservee.name}
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
  detailsText: {
    marginLeft: 4,
  },
  statusContainer: {
    marginBottom: 8,
  },
});
