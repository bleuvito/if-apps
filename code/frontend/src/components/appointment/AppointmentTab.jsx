import { router } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';

export default function AppointmentTab() {
  return (
    <View style={{ flex: 1 }}>
      <FlatList style={styles.flatlist} />
      <FAB
        icon='plus'
        style={styles.fab}
        onPress={() => router.push('appointment/create')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  flatlist: {
    flex: 1,
    gap: 16,
    padding: 16,
    paddingBottom: 48,
  },
});
