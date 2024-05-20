import { router } from 'expo-router';
import { FlatList, StyleSheet } from 'react-native';
import { FAB, Text } from 'react-native-paper';

export default function ReservationScreen() {
  return (
    <>
      {/* <FlatList
    data={announcements}
    contentContainerStyle={styles.contentContainer}
    renderItem={({ item }) => {
      return (
        <AnnouncementCard
          key={item.id}
          announcement={item}
          isRead
        />
      );
    }}
  /> */}
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
