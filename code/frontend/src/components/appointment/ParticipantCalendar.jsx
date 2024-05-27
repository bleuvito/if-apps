import axios from 'axios';
import dayjs from 'dayjs';
import id from 'dayjs/locale/id';
import { useCallback, useEffect, useState } from 'react';
import { Calendar } from 'react-native-big-calendar';

import { useWatch } from 'react-hook-form';
import { View } from 'react-native';
import { dayInt } from '../../constants';
import { useSession } from '../../providers/SessionProvider';
import CalendarToolbar from '../schedule/CalendarToolbar';
import Event from '../schedule/Event';
import ScheduleLegend from '../schedule/ScheduleLegend';

export default function ParticipantCalendar({ participantId, control }) {
  const { session } = useSession();
  const value = useWatch({
    control,
    name: 'date',
  });

  const [currDate, setCurrDate] = useState(value);
  const [events, setEvents] = useState([]);

  const getDateRange = () => {
    const firstDay = dayjs(currDate).locale(id).day(0);
    const lastDay = dayjs(firstDay).add(6, 'day');

    return [firstDay, lastDay];
  };

  const getEvents = async () => {
    if (participantId === null) return;

    const [start, end] = getDateRange();
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/user/${participantId}/agenda`;
    try {
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
    } catch (error) {
      console.error('Error catching agenda', error);
    }
  };

  useEffect(() => {
    getEvents();
  }, [currDate]);

  const eventRenderer = useCallback((event, touchableOpacityProps) => {
    return (
      <Event
        event={event}
        touchableOpacityProps={touchableOpacityProps}
      />
    );
  });

  return (
    <>
      <CalendarToolbar
        selectedDate={currDate}
        setSelectedDate={setCurrDate}
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
        date={currDate}
        activeDate={value}
        events={events}
        renderEvent={eventRenderer}
        mode='week'
        weekStartsOn={0}
        height={1}
        onSwipeEnd={false}
      />
    </>
  );
}
