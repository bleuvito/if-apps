import { Platform } from 'react-native';
import { Redirect, router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Text } from '@gluestack-ui/themed';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useSession } from '../../providers/SessionProvider';

function DrawerContent(props) {
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
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      <DrawerItem
        label={'Signout'}
        onPress={() => {
          handleSignout();
        }}
      />
    </DrawerContentScrollView>
  );
}

export default function Layout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href={'/sign-in'} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name='announcement'
          options={{
            drawerLabel: 'Announcement',
            title: 'Announcement',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name='appointment'
          options={{
            drawerLabel: 'Appointment',
            title: 'Appointment',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name='room'
          options={{
            drawerLabel: 'Room',
            title: 'Room',
            headerShown: false,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
