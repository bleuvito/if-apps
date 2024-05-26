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
    author: {
      name: '',
    },
    subject: '',
    bodies: [{ createdAt: '', body: '', attachments: [] }],
  });
  const [isLoading, setIsLoading] = useState(false);

  async function getAnnouncementHistoryDetails() {
    setIsLoading(true);

    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/announcement/${announcementId}/history/${historyId}`;
    const { data } = await axios.get(getUri, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    setAnnouncementHistory(data);

    setIsLoading(false);
  }

  useEffect(() => {
    getAnnouncementHistoryDetails();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView style={{ paddingHorizontal: 16, paddingBottom: 48 }}>
      <View style={{ marginBottom: 32 }}>
        <Text variant='headlineLarge'>{announcementHistory?.subject}</Text>
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
              {dayjs(announcementHistory?.bodies[0].createdAt)
                .locale('id')
                .format('DD MMM YYYY')}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon source='account-outline' />
            <Text
              variant='bodyMedium'
              style={{ marginLeft: 4 }}
            >
              {announcementHistory?.author?.name}
            </Text>
          </View>
        </View>
      </View>
      <RenderHTML
        contentWidth={width}
        source={{ html: announcementHistory?.bodies[0].body }}
      />
      <View style={{ marginTop: 64 }}>
        <Text
          variant='titleSmall'
          style={{ marginBottom: 4 }}
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
