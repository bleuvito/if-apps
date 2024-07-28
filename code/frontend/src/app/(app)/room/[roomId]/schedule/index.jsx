import axios from 'axios';
import dayjs from 'dayjs';
import id from 'dayjs/locale/id';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import { FAB } from 'react-native-paper';

import CalendarToolbar from '../../../../../components/CalendarToolbar';
import Event from '../../../../../components/schedule/Event';
import ScheduleLegend from '../../../../../components/schedule/ScheduleLegend';
import { dayInt } from '../../../../../constants';
import { useSession } from '../../../../../providers/SessionProvider';

export default function ScheduleScreen() {
  const { session } = useSession();
  const { roomId } = useLocalSearchParams();

  const [selectedDate, setSelectedDate] = useState(
    dayjs().locale('id').toDate()
  );
  const [events, setEvents] = useState([]);

  const getDateRange = () => {
    const firstDay = dayjs(selectedDate).locale(id).day(0);
    const lastDay = dayjs(firstDay).add(6, 'day');

    return [firstDay, lastDay];
  };

  const getEvents = async () => {
    const [start, end] = getDateRange();

    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/room-schedule/${roomId}`;
    const { data } = await axios.get(getUri, {
      headers: { Authorization: `Bearer ${session}` },
      params: {
        start,
        end,
      },
    });

    const fetchedEvents = data.map((event) => {
      if (event.isRecurring) {
        const eventStart = dayjs(event.start);
        const eventEnd = dayjs(event.end);
        const eventDay = dayInt[event.day];

        const newStart = dayjs(start)
          .set('hour', eventStart.hour())
          .set('minute', eventStart.minute())
          .add(eventDay, 'day');
        const newEnd = dayjs(start)
          .set('hour', eventEnd.hour())
          .set('minute', eventEnd.minute())
          .add(eventDay, 'day');

        return { ...event, start: newStart, end: newEnd };
      }

      return { ...event, start: dayjs(event.start), end: dayjs(event.end) };
    });

    setEvents(fetchedEvents);
  };

  useEffect(() => {
    getEvents();
  }, [selectedDate]);

  useFocusEffect(
    useCallback(() => {
      getEvents();
    }, [selectedDate])
  );

  const eventRenderer = useCallback((event, touchableOpacityProps) => {
    return (
      <Event
        event={event}
        touchableOpacityProps={touchableOpacityProps}
      />
    );
  });

  return (
    <View style={styles.screen}>
      <CalendarToolbar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          marginBottom: 4,
          justifyContent: 'center',
        }}
      >
        <ScheduleLegend type='Kelas' />
        <ScheduleLegend type='Pertemuan' />
        <ScheduleLegend type='Lainnya' />
      </View>
      <Calendar
        date={selectedDate}
        activeDate={selectedDate}
        events={events}
        renderEvent={eventRenderer}
        mode='week'
        weekStartsOn={0}
        height={1}
        onSwipeEnd={() => {}}
        locale='id'
        onPressDateHeader={(date) => {
          setSelectedDate(dayjs(date));
        }}
        onPressEvent={(event) => {
          router.push(`room/${roomId}/schedule/${event.id}`);
        }}
      />
      <FAB
        icon='plus'
        style={styles.fab}
        onPress={() => {
          router.push({
            pathname: `room/${roomId}/schedule/create/`,
            params: { selectedDate: selectedDate.toISOString() },
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  controller: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 64,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  debug: {
    borderWidth: 1,
    borderColor: 'red',
  },
});
