import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function TagBottomSheetSearch({ search, setSearch }) {
  return (
    <TextInput
      mode='outlined'
      placeholder='Cari tag'
      value={search}
      onChangeText={(text) => setSearch(text)}
      style={styles.search}
      right={
        <TextInput.Icon
          icon='close'
          onPress={() => {
            setSearch('');
          }}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  search: { width: '100%' },
});
