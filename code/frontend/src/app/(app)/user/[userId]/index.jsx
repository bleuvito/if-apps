import axios from 'axios';
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router';
import { useCallback, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import UserDetailsHeaderRight from '../../../../components/user/HeaderRight';
import UserDetailsText from '../../../../components/user/UserDetailsText';
import { useSession } from '../../../../providers/SessionProvider';

export default function UserDetailsScreen() {
  const { userId } = useLocalSearchParams();
  const { session, getRole } = useSession();
  const navigation = useNavigation();

  const userRole = getRole();

  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    role: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const getUserDetails = async () => {
    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/user/${userId}`;

    setIsLoading(true);
    try {
      const { data } = await axios.get(getUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });

      setUser(data);
    } catch (error) {
      console.log('Error getting user details: ', error);
    }
    setIsLoading(false);
  };

  function showDialog() {
    setVisible(true);
  }

  function hideDialog() {
    setVisible(false);
  }

  const handleDeleteUser = async () => {
    const deleteUri = `${process.env.EXPO_PUBLIC_BASE_URL}/user/${userId}`;

    try {
      const { data } = await axios.delete(deleteUri, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      });
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserDetails();
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return !['ADMIN', 'KAJUR'].includes(userRole) ? null : (
          <UserDetailsHeaderRight onPressDelete={showDialog} />
        );
      },
    });
  }, [navigation, user]);

  return (
    <View style={{ paddingHorizontal: 16, rowGap: 16 }}>
      <Text
        variant='headlineLarge'
        style={{ marginBottom: 8 }}
      >
        {user.name}
      </Text>
      <UserDetailsText
        title={'Email'}
        body={user.email}
      />
      <UserDetailsText
        title={'Role'}
        body={user.role}
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>Hapus pengguna?</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Batal</Button>
          </Dialog.Actions>
          <Dialog.Actions>
            <Button onPress={handleDeleteUser}>Hapus</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
