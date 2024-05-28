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
import {
  FormLoading,
  useFormLoading,
} from '../../../../components/FormLoading';
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

  const {
    visible: formLoadingVisible,
    showDialog: formLoadingShow,
    hideDialog: formLoadingHide,
    goBack,
  } = useFormLoading();

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

  const handleDeleteSchedule = async () => {
    const deleteUri = `${process.env.EXPO_PUBLIC_BASE_URL}/schedule/${scheduleId}`;
    try {
      const { data } = await axios.delete(deleteUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
      formLoadingShow();
    } catch (error) {
      formLoadingHide();
      goBack();
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
        return schedule?.lecturerId === userId ? (
          <ScheduleDetailsHeaderRight onPressDelete={showDialog} />
        ) : null;
      },
    });
  }, [navigation, schedule]);

  return (
    <View style={[styles.screen]}>
      <ScheduleDetailsText
        title='Judul'
        body={schedule.title}
      />
      <ScheduleDetailsText
        title='Tipe'
        body={schedule.type}
      />
      <ScheduleDetailsText
        title='Hari, Tanggal'
        body={dayjs(schedule.day).locale('id').format('dddd, DD MMMM YYYY')}
      />
      <ScheduleDetailsText
        title='Waktu'
        body={`${dayjs(schedule.start).format('HH:mm')}-${dayjs(
          schedule.end
        ).format('HH:mm')}`}
      />
      <ScheduleDetailsText
        title='Mingguan'
        body={schedule.isRecurring ? 'Ya' : 'Tidak'}
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>Hapus jadwal?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Batal</Button>
            <Button onPress={handleDeleteSchedule}>Hapus</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <FormLoading visible={formLoadingVisible} />
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
