import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';

import AnnouncementList from '../../../components/announcement/AnnouncementList';
import { default as AnnouncementListControl } from '../../../components/announcement/AnnouncementListControl';
import { useSession } from '../../../providers/SessionProvider';

export default function AnnouncementScreen() {
  const { getRole } = useSession();

  const [subject, setSubject] = useState('');
  const [tags, setTags] = useState([]);

  const role = getRole();

  return (
    <View style={{ flex: 1 }}>
      <AnnouncementListControl
        setSubject={setSubject}
        setTags={setTags}
      />
      <AnnouncementList
        subject={subject}
        tags={tags}
      />
      {role !== 'MAHASISWA' && (
        <FAB
          icon='plus'
          style={styles.fab}
          onPress={() => router.push('/announcement/create')}
        />
      )}
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
});
