import { router } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';

export default function AppointmentTab() {
  return (
    <View style={{ flex: 1 }}>
      <FlatList style={styles.flatlist} />
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
});
