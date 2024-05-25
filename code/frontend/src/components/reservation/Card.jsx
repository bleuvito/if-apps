import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Card, Icon, Text } from 'react-native-paper';
import { getTimeDuration } from '../../helpers/utils';
import LeftCalendarComponent from '../LeftCalendarIconComponent';

export default function ReservationCard({ reservation }) {
  return (
    <Card
      onPress={() => {
        router.push(`reservation/${reservation.id}`);
      }}
    >
      <Card.Content style={styles.content}>
        <LeftCalendarComponent date={reservation.start} />
        <View style={{ marginLeft: 12 }}>
          <Text variant='titleMedium'>{reservation.title}</Text>
          <View style={[styles.body]}>
            <View style={[styles.body, { marginRight: 12 }]}>
              <Icon source='clock-outline' />
              <Text
                variant='bodyMedium'
                style={styles.logoText}
              >
                {getTimeDuration(reservation.start, reservation.end)}
              </Text>
            </View>
            <View style={styles.body}>
              <MaterialIcons name='location-pin' />
              <Text
                variant='bodyMedium'
                style={styles.logoText}
              >
                {reservation.room.name}
              </Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    marginLeft: 4,
  },
});
