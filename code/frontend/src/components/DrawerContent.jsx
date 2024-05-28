import { DrawerContentScrollView } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { useState } from 'react';
import { Platform } from 'react-native';
import { Drawer, useTheme } from 'react-native-paper';

import { drawerItem } from '../constants';
import { useSession } from '../providers/SessionProvider';

export default function DrawerContent(props) {
  const { signOut, getRole, getUser } = useSession();
  const [active, setActive] = useState('announcement');

  const userRole = getRole();
  // const user = getUser();
  const theme = useTheme();

  let handleSignout;
  if (Platform.OS === 'web') {
    const { googleLogout } = require('@react-oauth/google');

    handleSignout = () => {
      try {
        googleLogout();
        signOut();
        router.replace(drawerItem.signOut.route);
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
        router.replace(drawerItem.signOut.route);
      } catch (error) {
        console.error('Error signing out user on Android: ', error);
      }
    };
  }

  function handleDrawerItemPress(route) {
    setActive(route);
    router.navigate(route);
  }

  return (
    <>
      <DrawerContentScrollView>
        <Drawer.Section title={drawerItem.annnouncement.label}>
          <Drawer.Item
            label={drawerItem.annnouncement.label}
            icon='email'
            active={active === drawerItem.annnouncement.route}
            onPress={() =>
              handleDrawerItemPress(drawerItem.annnouncement.route)
            }
          />
          {['ADMIN', 'KAJUR', 'KAPRODI', 'KALAB', 'DOSEN'].includes(
            userRole
          ) && (
            <Drawer.Item
              label={drawerItem.tag.label}
              icon='tag'
              active={active === drawerItem.tag.route}
              onPress={() => handleDrawerItemPress(drawerItem.tag.route)}
            />
          )}
        </Drawer.Section>
        <Drawer.Section title={drawerItem.appointment.label}>
          <Drawer.Item
            label={drawerItem.appointment.label}
            icon='calendar'
            active={active === drawerItem.appointment.route}
            onPress={() => handleDrawerItemPress(drawerItem.appointment.route)}
          />
          {['ADMIN', 'KAJUR', 'KAPRODI', 'KALAB', 'DOSEN'].includes(
            userRole
          ) && (
            <Drawer.Item
              label={drawerItem.schedule.label}
              icon='calendar-account'
              active={active === drawerItem.schedule.route}
              onPress={() => handleDrawerItemPress(drawerItem.schedule.route)}
            />
          )}
        </Drawer.Section>
        <Drawer.Section title={drawerItem.reservation.label}>
          <Drawer.Item
            label={drawerItem.reservation.label}
            icon='book-open'
            active={active === drawerItem.reservation.route}
            onPress={() => handleDrawerItemPress(drawerItem.reservation.route)}
          />
          {['ADMIN', 'KAJUR', 'KALAB'].includes(userRole) && (
            <Drawer.Item
              label={drawerItem.room.label}
              icon='greenhouse'
              active={active === drawerItem.room.route}
              onPress={() => handleDrawerItemPress(drawerItem.room.route)}
            />
          )}
        </Drawer.Section>
        {/* <Drawer.Section title={drawerItem.user.label}> */}

        {/* <Drawer.Item
            label={`Halo, ${user.name}`}
            icon='account-circle'
            style={{ backgroundColor: 'grey' }}
            active={true}
            disabled={true}
            // onPress={() => handleDrawerItemPress(drawerItem.profile.route)}
          /> */}
        {/* </Drawer.Section> */}
        {['ADMIN', 'KAJUR'].includes(userRole) && (
          <Drawer.Item
            label={drawerItem.user.label}
            icon='account-group'
            active={active === drawerItem.user.route}
            onPress={() => handleDrawerItemPress(drawerItem.user.route)}
          />
        )}
        <Drawer.Item
          label={drawerItem.signOut.label}
          icon='logout'
          onPress={() => handleSignout()}
        />
      </DrawerContentScrollView>
    </>
  );
}
