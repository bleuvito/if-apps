import { Button, ButtonText } from '@gluestack-ui/themed';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Platform } from 'react-native';
import { useSession } from '../providers/SessionProvider';

export default function DrawerContent(props) {
  const { signOut } = useSession();

  let handleSignout;
  if (Platform.OS === 'web') {
    const { googleLogout } = require('@react-oauth/google');

    handleSignout = () => {
      try {
        googleLogout();
        signOut();
        router.replace('/');
      } catch (error) {
        console.error('Error signing out user on web: ', error);
      }
    };
  } else {
    const {
      GoogleSignin,
    } = require('@react-native-google-signin/google-signin');

    handleSignout = async () => {
      try {
        await GoogleSignin.signOut();
        signOut();
        router.replace('/');
      } catch (error) {
        console.error('Error signing out user on Android: ', error);
      }
    };
  }

  return (
    <>
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
        <DrawerItem
          label={'Signout'}
          onPress={() => {
            handleSignout();
          }}
        />
      </DrawerContentScrollView>
    </>
  );
}
