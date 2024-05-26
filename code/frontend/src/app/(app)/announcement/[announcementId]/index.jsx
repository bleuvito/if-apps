import { A } from '@expo/html-elements';
import axios from 'axios';
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router';
import { useCallback, useLayoutEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Chip,
  Dialog,
  Icon,
  Portal,
  Text,
} from 'react-native-paper';
import RenderHTML from 'react-native-render-html';

import dayjs from 'dayjs';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import AnnouncementDetailsHeaderRight from '../../../../components/announcement/DetailsHeaderRight';
import { useSession } from '../../../../providers/SessionProvider';

export default function AnnouncementDetailScreen() {
  const { announcementId } = useLocalSearchParams();
  const [visible, setVisible] = useState(false);
  const [announcement, setAnnouncement] = useState({
    author: '',
    createdAt: '',
    subject: '',
    body: '',
    attachments: [],
    tags: [],
    isPinned: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { getRole, session } = useSession();
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return role !== 'MAHASISWA' ? (
          <AnnouncementDetailsHeaderRight onPressDelete={showDialog} />
        ) : null;
      },
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      getAnnouncement();
    }, [])
  );

  async function getAnnouncement() {
    setIsLoading(true);

    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/announcement/${announcementId}`;
    const { data } = await axios.get(getUri, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    const {
      author,
      isPinned,
      subject,
      bodies: [{ createdAt, body, attachments }],
      tags,
    } = data;
    setAnnouncement({
      author,
      createdAt,
      subject,
      body,
      attachments,
      tags,
      isPinned,
    });

    setIsLoading(false);
  }

  function showDialog() {
    setVisible(true);
  }

  function hideDialog() {
    setVisible(false);
  }

  async function handleDeleteAnnouncement() {
    const deleteUri = `${process.env.EXPO_PUBLIC_BASE_URL}/announcement/${announcementId}`;

    try {
      const response = await axios.delete(deleteUri, {
        headers: { Authorization: `Bearer ${session}` },
      });
    } catch (error) {
      console.error('Error deleting announcement: ', response);
    }
  }

  const role = getRole();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      <View style={{ marginBottom: 32 }}>
        <Text variant='headlineLarge'>{announcement.subject}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 8,
            }}
          >
            <Icon source='clock-outline' />
            <Text
              variant='bodyMedium'
              style={{ marginLeft: 4 }}
            >
              {dayjs(announcement.createdAt).locale('id').format('DD MMM YYYY')}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon source='account-outline' />
            <Text
              variant='bodyMedium'
              style={{ marginLeft: 4 }}
            >
              {announcement.author.name}
            </Text>
          </View>
        </View>
      </View>
      <RenderHTML
        contentWidth={width}
        source={{ html: announcement.body }}
      />
      {announcement.attachments.length > 0 && (
        <View style={{ marginTop: 64 }}>
          <Text
            variant='titleSmall'
            style={{ marginBottom: 4 }}
          >
            Lampiran
          </Text>
          <View style={styles.chipContainer}>
            {announcement.attachments.map((attachment, index) => (
              <Chip
                key={index}
                icon='file'
              >
                <A href={attachment.webViewLink}>{attachment.name}</A>
              </Chip>
            ))}
          </View>
        </View>
      )}
      {announcement.tags.length > 0 && (
        <View style={{ marginTop: 16 }}>
          <Text
            variant='titleSmall'
            style={{ marginBottom: 4 }}
          >
            Tag
          </Text>
          <View style={styles.chipContainer}>
            {announcement.tags.map((tag, index) => (
              <Chip
                key={index}
                icon='tag'
              >
                {tag.name}
              </Chip>
            ))}
          </View>
        </View>
      )}
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>Hapus pengumuman?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Batal</Button>
            <Button onPress={handleDeleteAnnouncement}>Hapus</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { marginBottom: 4 },
  attachmentContainer: { rowGap: 4 },
  chipContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
});
