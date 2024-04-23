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
import DrawerContent from '../../components/DrawerContent';

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
      <Drawer drawerContent={DrawerContent}>
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
