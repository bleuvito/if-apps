import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Slot } from 'expo-router';
import { Platform, SafeAreaView, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';

import { ifAppsTheme, scopes } from '../constants';
import { SessionProvider } from '../providers/SessionProvider';

if (Platform.OS === 'android') {
  const { GoogleSignin } = require('@react-native-google-signin/google-signin');

  GoogleSignin.configure({
    scopes,
    webClientId: process.env.EXPO_PUBLIC_GAUTH_WEB_CLIENT_ID,
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });
}

export default function Layout() {
  const colorScheme = useColorScheme();

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });
  const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
      ...ifAppsTheme.light,
    },
  };
  const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...DarkTheme.colors,
      ...ifAppsTheme.dark,
    },
  };

  const theme =
    colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <SessionProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PaperProvider theme={theme}>
            <ThemeProvider value={theme}>
              {Platform.OS === 'web' ? (
                <GoogleOAuthProvider
                  clientId={process.env.EXPO_PUBLIC_GAUTH_WEB_CLIENT_ID}
                >
                  <Slot />
                </GoogleOAuthProvider>
              ) : (
                <Slot />
              )}
            </ThemeProvider>
          </PaperProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SessionProvider>
  );
}
