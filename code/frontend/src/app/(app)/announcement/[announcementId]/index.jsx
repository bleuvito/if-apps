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
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text variant='headlineLarge'>{announcement.subject}</Text>
        <View style={styles.subHeaderContainer}>
          <View style={[styles.subHeaderDetailsContainer, styles.createdAt]}>
            <Icon source='clock-outline' />
            <Text
              variant='bodyMedium'
              style={styles.subHeaderDetailsText}
            >
              {dayjs(announcement.createdAt).locale('id').format('DD MMM YYYY')}
            </Text>
          </View>
          <View style={styles.subHeaderDetailsContainer}>
            <Icon source='account-outline' />
            <Text
              variant='bodyMedium'
              style={styles.subHeaderDetailsText}
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
        <View style={styles.attachmentContainer}>
          <Text
            variant='titleSmall'
            style={styles.label}
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
            style={styles.label}
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
  container: { paddingHorizontal: 16, paddingBottom: 48 },
  headerContainer: { marginBottom: 32 },
  subHeaderContainer: { flexDirection: 'row' },
  subHeaderDetailsContainer: { flexDirection: 'row', alignItems: 'center' },
  subHeaderDetailsText: { marginLeft: 4 },
  createdAt: { marginRight: 8 },
  attachmentContainer: { marginTop: 64 },
  label: { marginBottom: 4 },
  chipContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
});
