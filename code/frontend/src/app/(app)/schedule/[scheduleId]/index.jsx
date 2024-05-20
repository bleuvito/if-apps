import axios from 'axios';
import dayjs from 'dayjs';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Checkbox, Dialog, Portal, Text } from 'react-native-paper';
import ScheduleDetailsHeaderRight from '../../../../components/schedule/HeaderRight';
import ScheduleDetailsText from '../../../../components/schedule/ScheduleDetailsText';
import { useSession } from '../../../../providers/SessionProvider';

export default function ScheduleDetailsScreen() {
  const { scheduleId } = useLocalSearchParams();
  const { session, getUserId } = useSession();
  const navigation = useNavigation();

  const [schedule, setSchedule] = useState({
    lecturerId: '',
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
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/schedule/${scheduleId}`;
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

  const handleDeleteSchedule = () => {
    console.log('schedule delete');
  };

  useEffect(() => {
    getSchedule();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return schedule?.lecturerId === userId ? (
          <ScheduleDetailsHeaderRight onPressDelete={showDialog} />
        ) : null;
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
            <Button onPress={handleDeleteSchedule}>Delete</Button>
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
