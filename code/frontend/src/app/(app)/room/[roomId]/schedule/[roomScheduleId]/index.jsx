import axios from 'axios';
import dayjs from 'dayjs';
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Checkbox, Dialog, Portal, Text } from 'react-native-paper';
import RoomScheduleDetailsHeaderRight from '../../../../../../components/room/RoomScheduleDetailsHeaderRight';
import ScheduleDetailsHeaderRight from '../../../../../../components/schedule/HeaderRight';
import ScheduleDetailsText from '../../../../../../components/schedule/ScheduleDetailsText';
import { useSession } from '../../../../../../providers/SessionProvider';

export default function ScheduleDetailsScreen() {
  const { roomId, roomScheduleId } = useLocalSearchParams();
  const { session, getUserId } = useSession();
  const navigation = useNavigation();

  const [schedule, setSchedule] = useState({
    roomId: '',
    title: 'Title',
    type: 'KELAS',
    isRecurring: true,
    day: new Date(),
    start: new Date(),
    end: new Date(),
  });
  const [visible, setVisible] = useState(false);

  const userId = getUserId();

  const getSchedule = async () => {
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/room-schedule/${roomId}/schedule/${roomScheduleId}`;
    try {
      const { data } = await axios.get(getUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });

      data.day = data.start;

      setSchedule(data);
    } catch (error) {
      console.error('Error getting schedule', error);
    }
  };

  function showDialog() {
    setVisible(true);
  }

  function hideDialog() {
    setVisible(false);
  }

  const handleDeleteRoomSchedule = async () => {
    const deleteUri = `${process.env.EXPO_PUBLIC_BASE_URL}/room-schedule/${roomId}/schedule/${roomScheduleId}`;
    try {
      const { data } = await axios.delete(deleteUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
    } catch (error) {
      console.error('Error deleting shedule: ', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getSchedule();
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <RoomScheduleDetailsHeaderRight onPressDelete={showDialog} />;
      },
    });
  }, [navigation, schedule]);

  return (
    <View style={[styles.screen]}>
      <ScheduleDetailsText
        title='Title'
        body={schedule.title}
      />
      <ScheduleDetailsText
        title='Type'
        body={schedule.type}
      />
      <Checkbox.Item
        label='Mingguan'
        status={schedule.isRecurring ? 'checked' : 'unchecked'}
      />
      <ScheduleDetailsText
        title='Date'
        body={dayjs(schedule.day).format('dddd, DD MMMM YYYY')}
      />
      <ScheduleDetailsText
        title='Time'
        body={`${dayjs(schedule.start).format('HH:mm')}-${dayjs(
          schedule.end
        ).format('HH:mm')}`}
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>Delete schedule?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
          <Dialog.Actions>
            <Button onPress={handleDeleteRoomSchedule}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    rowGap: 32,
  },
  debug: {
    borderWidth: 1,
    borderColor: 'red',
  },
});
