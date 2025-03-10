import { StyleSheet, View } from 'react-native';
import SearchInput from '../SearchInput';
import StatusFilter from '../StatusFilter';

export default function AppointmentListControl({ setSearch, setStatuses }) {
  return (
    <>
      <View style={styles.listControlContainer}>
        <SearchInput
          setSearch={setSearch}
          itemToSearchFor='janji temu'
        />
      </View>
      <View style={styles.listControlContainer}>
        <StatusFilter setStatuses={setStatuses} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  listControlContainer: { paddingHorizontal: 16, paddingBottom: 8 },
});
