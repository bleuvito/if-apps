import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchInput from '../SearchInput';
import AnnouncementTagFilter from './AnnouncementTagFilter';

export default function AnnouncementListControl({ setSubject, setTags }) {
  return (
    <>
      <View style={styles.search}>
        <SearchInput
          setSearch={setSubject}
          itemToSearchFor={'pengumuman'}
        />
      </View>
      <View style={styles.tags}>
        <AnnouncementTagFilter setTags={setTags} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  search: { paddingHorizontal: 16, marginBottom: 8 },
  tags: { paddingLeft: 16, paddingBottom: 8 },
});
