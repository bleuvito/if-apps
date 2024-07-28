import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { useSession } from '../../providers/SessionProvider';
import ListEmpty from '../ListEmpty';
import LoadingIndicator from '../LoadingIndicator';
import ReservationListItem from './ReservationListItem';

export default function ReservationList({ search, status }) {
  const { session } = useSession();

  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getReservations = async () => {
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/reservation`;

    try {
      setIsLoading(true);

      const { data } = await axios.get(getUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
        params: {
          search,
          status,
        },
      });
      setReservations(data);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching reservation list: ', error);
    }
  };

  const renderItem = useCallback(({ item }) => {
    return <ReservationListItem reservation={item} />;
  }, []);

  const renderListEmpty = useCallback(() => {
    return <ListEmpty itemType='pinjaman ruangan' />;
  }, []);

  const onRefresh = useCallback(() => {
    getReservations();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getReservations();
    }, [])
  );

  useEffect(() => {
    getReservations();
  }, [search, status]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <FlatList
      data={reservations}
      keyExtractor={(reservation) => reservation.id}
      renderItem={renderItem}
      ListEmptyComponent={renderListEmpty}
      onRefresh={onRefresh}
      refreshing={isLoading}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    gap: 16,
    padding: 16,
    paddingBottom: 48,
  },
});
