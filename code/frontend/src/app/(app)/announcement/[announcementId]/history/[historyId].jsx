import { A } from '@expo/html-elements';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { Chip, Text } from 'react-native-paper';
import RenderHTML from 'react-native-render-html';

import { useSession } from '../../../../../providers/SessionProvider';

export default function AnnouncementDetailScreen() {
  const { announcementId, historyId } = useLocalSearchParams();
  const { session } = useSession();
  const { width } = useWindowDimensions();
  const [announcementHistoryDetails, setAnnouncementHistoryDetails] = useState({
    author: '',
    createDate: '',
    subject: '',
    body: '',
    attachments: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  async function getAnnouncementHistoryDetails() {
    setIsLoading(true);

    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/announcement/${announcementId}/history/${historyId}`;
    const {
      data: { data: announcementHistoryDetails },
    } = await axios.get(getUri, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    const {
      author,
      subject,
      bodies: [{ createDate, body, attachments }],
    } = announcementHistoryDetails;
    setAnnouncementHistoryDetails({
      author: author.name,
      createDate,
      subject,
      body,
      attachments,
    });

    setIsLoading(false);
  }

  useEffect(() => {
    getAnnouncementHistoryDetails();
  }, []);

  if (isLoading) {
    return <Text>Is Loading...</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text
            variant='headlineLarge'
            style={styles.title}
          >
            {announcementHistoryDetails.subject}
          </Text>
          <Text>{announcementHistoryDetails.createDate}</Text>
        </View>
        <RenderHTML
          contentWidth={width}
          source={{ html: announcementHistoryDetails.body }}
        />
        <View style={styles.attachmentContainer}>
          <Text variant='titleMedium'>Lampiran</Text>
          <View style={styles.chipContainer}>
            {announcementHistoryDetails.attachments.map((attachment, index) => (
              <Chip
                key={index}
                icon='file'
              >
                <A href={attachment.webViewLink}>{attachment.name}</A>
              </Chip>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, rowGap: 32 },
  title: { marginBottom: 4 },
  attachmentContainer: { rowGap: 4 },
  chipContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
});
