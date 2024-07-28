import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { useSession } from '../../providers/SessionProvider';
import ListEmpty from '../ListEmpty';
import LoadingIndicator from '../LoadingIndicator';
import AppointmentListItem from './AppointmentListItem';

export default function AppointmentList({ type, searchType, search, status }) {
  const { getUserId, session } = useSession();
  const userId = getUserId();

  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAppointments = async () => {
    try {
      setIsLoading(true);

      const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/appointment`;
      const { data } = await axios.get(getUri, {
        headers: { Authorization: `Bearer ${session}` },
        params: {
          type: searchType,
          search,
          status,
        },
      });
      setAppointments(data);

      setIsLoading(false);
    } catch (error) {
      console.error('Error getting appointment list:', error);
    }
  };

  const renderItem = useCallback(({ item }) => {
    return (
      <AppointmentListItem
        appointment={item}
        userId={userId}
      />
    );
  }, []);

  const renderListEmpty = useCallback(() => {
    return <ListEmpty itemType='janji temu' />;
  }, []);

  const onRefresh = useCallback(() => {
    if (type === searchType) {
      getAppointments();
    }
  }, [searchType]);

  useFocusEffect(
    useCallback(() => {
      if (type === searchType) {
        getAppointments();
      }
    }, [searchType])
  );

  useEffect(() => {
    if (type === searchType) {
      getAppointments();
    }
  }, [searchType, search, status]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <FlatList
      data={appointments}
      keyExtractor={(appointment) => appointment.id}
      renderItem={renderItem}
      ListEmptyComponent={renderListEmpty}
      onRefresh={onRefresh}
      refreshing={isLoading}
      contentContainerStyle={styles.contectContainer}
    />
  );
}

const styles = StyleSheet.create({
  contectContainer: { flexGrow: 1, gap: 16, padding: 16, paddingBottom: 48 },
});
