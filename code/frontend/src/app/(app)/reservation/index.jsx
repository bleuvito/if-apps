import axios from 'axios';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, FAB, Text } from 'react-native-paper';
import ReservationCard from '../../../components/reservation/Card';
import ReservationSearchInput from '../../../components/reservation/ReservationSearchInput';
import { useSession } from '../../../providers/SessionProvider';

export default function ReservationScreen() {
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
      });
      setReservations(data);

      setIsLoading(false);
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      getReservations();
    }, [])
  );

  if (isLoading) {
    return <ActivityIndicator size='large' />;
  }

  return (
    <>
      <View style={{ paddingHorizontal: 16 }}>
        <ReservationSearchInput setReservations={setReservations} />
      </View>
      <FlatList
        data={reservations}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => {
          return <ReservationCard reservation={item} />;
        }}
      />
      <FAB
        icon='plus'
        style={styles.fab}
        onPress={() => router.push('reservation/create')}
      />
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    gap: 16,
    padding: 16,
    paddingBottom: 48,
  },
});
