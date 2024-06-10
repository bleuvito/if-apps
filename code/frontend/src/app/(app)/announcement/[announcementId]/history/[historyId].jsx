import { A } from '@expo/html-elements';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { Chip, Icon, Text } from 'react-native-paper';
import RenderHTML from 'react-native-render-html';

import dayjs from 'dayjs';
import LoadingIndicator from '../../../../../components/LoadingIndicator';
import { useSession } from '../../../../../providers/SessionProvider';

export default function AnnouncementHistoryDetailsScreen() {
  const { announcementId, historyId } = useLocalSearchParams();
  const { session } = useSession();
  const { width } = useWindowDimensions();

  const [announcementHistory, setAnnouncementHistory] = useState({
    subject: '',
    bodies: [
      {
        createdAt: '',
        body: '',
        attachments: [],
        author: {
          name: '',
        },
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(false);

  async function getAnnouncementHistoryDetails() {
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/announcement/${announcementId}/history/${historyId}`;
    try {
      setIsLoading(true);
      const { data } = await axios.get(getUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });

      setAnnouncementHistory(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching announcement history details: ', error);
    }
  }

  useEffect(() => {
    getAnnouncementHistoryDetails();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text variant='headlineLarge'>{announcementHistory?.subject}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.subheaderContainer, styles.createdAt]}>
            <Icon source='clock-outline' />
            <Text
              variant='bodyMedium'
              style={styles.subheaderText}
            >
              {dayjs(announcementHistory?.bodies[0].createdAt)
                .locale('id')
                .format('DD MMM YYYY')}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon source='account-outline' />
            <Text
              variant='bodyMedium'
              style={styles.subheaderText}
            >
              {announcementHistory?.bodies[0]?.author.name}
            </Text>
          </View>
        </View>
      </View>
      <RenderHTML
        contentWidth={width}
        source={{ html: announcementHistory?.bodies[0].body }}
      />
      {announcementHistory?.bodies[0].attachments.length > 0 && (
        <View style={styles.attachmentContainer}>
          <Text
            variant='titleSmall'
            style={styles.title}
          >
            Lampiran
          </Text>
          <View style={styles.chipContainer}>
            {announcementHistory?.bodies[0]?.attachments.map(
              (attachment, index) => (
                <Chip
                  key={index}
                  icon='file'
                >
                  <A href={attachment.webViewLink}>{attachment.name}</A>
                </Chip>
              )
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingBottom: 48 },
  headerContainer: { marginBottom: 32 },
  subheaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subheaderText: { marginLeft: 4 },
  createdAt: {
    marginRight: 8,
  },
  attachmentContainer: { marginTop: 64 },
  title: { marginBottom: 4 },
  chipContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
});
