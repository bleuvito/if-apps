import { A } from '@expo/html-elements';
import axios from 'axios';
import dayjs from 'dayjs';
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
import { Chip, Icon, Text } from 'react-native-paper';
import RenderHTML from 'react-native-render-html';

import {
  FormLoading,
  useFormLoading,
} from '../../../../components/FormLoading';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import AnnouncementDetailsHeader from '../../../../components/announcement/AnnouncementDetailsHeader';
import { useSession } from '../../../../providers/SessionProvider';

export default function AnnouncementDetailScreen() {
  const { announcementId } = useLocalSearchParams();
  const { getRole, session, getUserId } = useSession();

  const userId = getUserId();
  const role = getRole();

  const {
    visible: formVisible,
    goBack,
    hideDialog: hideFormDialog,
    showDialog: showFormDialog,
  } = useFormLoading();
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

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

  async function getAnnouncement() {
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/announcement/${announcementId}`;
    try {
      setIsLoading(true);
      const { data } = await axios.get(getUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });

      const {
        subject,
        isPinned,
        tags,
        bodies: [{ author, createdAt, body, attachments }],
      } = data;

      setAnnouncement({
        author,
        createdAt,
        subject,
        isPinned,
        tags,
        body,
        attachments,
      });
    } catch (error) {
      console.error('Error fetching announcement details: ', error);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getAnnouncement();
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return ['ADMIN', 'KAJUR', 'KAPRODI'].includes(role) ||
          announcement.author.id === userId ? (
          <AnnouncementDetailsHeader
            showFormDialog={showFormDialog}
            hideFormDialog={hideFormDialog}
            goBack={goBack}
            isPinned={announcement.isPinned}
          />
        ) : null;
      },
    });
  }, [navigation, announcement]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView style={{ paddingHorizontal: 16, paddingBottom: 48 }}>
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
        <View style={{ marginTop: 16, marginBottom: 96 }}>
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
      <FormLoading visible={formVisible} />
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
