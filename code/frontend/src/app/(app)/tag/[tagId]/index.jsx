import axios from 'axios';
import dayjs from 'dayjs';
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router';
import { useCallback, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import {
  FormLoading,
  useFormLoading,
} from '../../../../components/FormLoading';
import TagDetailsHeaderRight from '../../../../components/tag/HeaderRight';
import TagDetailsText from '../../../../components/tag/TagDetailsText';
import { useSession } from '../../../../providers/SessionProvider';

export default function TagDetailsScreen() {
  const { tagId } = useLocalSearchParams();
  const { session, getUserId, getRole } = useSession();
  const navigation = useNavigation();
  const {
    visible: formLoadingVisible,
    hideDialog: formLoadingHide,
    showDialog: formLoadingShow,
    goBack,
  } = useFormLoading();

  const userId = getUserId();
  const userRole = getRole();

  const [tag, setTag] = useState({
    id: '',
    name: '',
    author: {
      id: '',
      name: '',
    },
    createdAt: '',
    updatedAt: '',
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

    hideDialog();
    formLoadingShow();
    try {
      const { data } = await axios.delete(deleteUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
    } catch (error) {
      console.error('Error deleting reservation: ', error);
    } finally {
      formLoadingHide();
      goBack();
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
        return tag?.author.id !== userId &&
          !['ADMIN', 'KAJUR', 'KAPRODI'].includes(userRole) ? null : (
          <TagDetailsHeaderRight onPressDelete={showDialog} />
        );
      },
    });
  }, [navigation, tag]);

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <TagDetailsText
        title='Nama'
        body={tag.name}
      />
      <TagDetailsText
        title='Pembuat'
        body={tag.author.name}
      />
      <TagDetailsText
        title='Tanggal Pembuatan'
        body={dayjs(tag.createdAt).locale('id').format('DD MMMM YYYY')}
      />
      <TagDetailsText
        title='Tanggal Diperbarui'
        body={dayjs(tag.updatedAt).locale('id').format('DD MMMM YYYY')}
      />

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>Hapus tag?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Batal</Button>
            <Button onPress={handleDeleteTag}>Hapus</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <FormLoading visible={formLoadingVisible} />
    </View>
  );
}
