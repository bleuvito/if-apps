import { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import AppointmentCard from './AppointmentCard';

export default function AppointmentTab({
  appointments,
  isLoading,
  onSearch,
  onFilter,
}) {
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator
          animating={true}
          size='large'
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={appointments}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(appointment, index) => appointment.id}
        renderItem={({ item }) => {
          return <AppointmentCard appointment={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
    gap: 16,
    padding: 16,
    paddingBottom: 48,
  },
  contentContainer: {
    gap: 16,
    padding: 16,
    paddingBottom: 48,
  },
});
