import { Redirect, router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';

import SearchInput from '../../../components/SearchInput';
import TagList from '../../../components/tag/TagList';
import { useSession } from '../../../providers/SessionProvider';

export default function TagScreen() {
  const { getRole } = useSession();

  const [search, setSearch] = useState('');

  const role = getRole();

  if (role === 'MAHASISWA') {
    return <Redirect href={'/'} />;
  }

  useFocusEffect(
    useCallback(() => {
      setSearch('');
    }, [])
  );

  return (
    <>
      <View style={styles.searchContainer}>
        <SearchInput
          setSearch={setSearch}
          itemToSearchFor='tag pengumuman'
        />
      </View>
      <TagList search={search} />
      <FAB
        icon='plus'
        style={styles.fab}
        onPress={() => router.push('/tag/create')}
      />
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: { paddingHorizontal: 16, paddingBottom: 16 },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
