import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Text, useTheme } from 'react-native-paper';

import { Platform } from 'react-native';
import DrawerContent from '../../components/DrawerContent';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useSession } from '../../providers/SessionProvider';

export default function Layout() {
  const { session, isLoading } = useSession();
  const theme = useTheme();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!session) {
    return <Redirect href={'/sign-in'} />;
  }

  return (
    <BottomSheetModalProvider>
      <Drawer
        drawerContent={DrawerContent}
        screenOptions={{
          drawerType: Platform.OS === 'web' ? 'permanent' : 'front',
          drawerStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Drawer.Screen
          name='announcement'
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name='tag'
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name='appointment'
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name='schedule'
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name='reservation'
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name='room'
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name='user'
          options={{
            headerShown: false,
          }}
        />
      </Drawer>
    </BottomSheetModalProvider>
  );
}
