import axios from 'axios';
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router';
import { useCallback, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import TagDetailsHeaderRight from '../../../../components/tag/HeaderRight';
import TagDetailsText from '../../../../components/tag/TagDetailsText';
import { useSession } from '../../../../providers/SessionProvider';

export default function UserDetailsScreen() {
  const { tagId } = useLocalSearchParams();
  const { session, getUserId, getRole } = useSession();
  const navigation = useNavigation();

  const userId = getUserId();
  const userRole = getRole();

  const [tag, setTag] = useState({
    id: '',
    name: '',
    authorId: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const getTagDetails = async () => {
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/tag/${tagId}`;

    setIsLoading(true);
    try {
      const { data } = await axios.get(getUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });

      setTag(data);
    } catch (error) {
      console.log('Error getting tag details: ', error);
    }
    setIsLoading(false);
  };

  function showDialog() {
    setVisible(true);
  }

  function hideDialog() {
    setVisible(false);
  }

  const handleDeleteTag = async () => {
    const deleteUri = `${process.env.EXPO_PUBLIC_BASE_URL}/tag/${tagId}`;

    try {
      const { data } = await axios.delete(deleteUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
    } catch (error) {
      console.error('Error deleting reservation: ', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTagDetails();
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return tag?.authorId !== userId &&
          !['ADMIN', 'KAJUR', 'KAPRODI'].includes(userRole) ? null : (
          <TagDetailsHeaderRight onPressDelete={showDialog} />
        );
      },
    });
  }, [navigation, tag]);

  return (
    <View>
      <TagDetailsText
        title={'Name'}
        body={tag.name}
      />

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>Delete tag?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
          <Dialog.Actions>
            <Button onPress={handleDeleteTag}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
