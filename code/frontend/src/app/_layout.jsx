import { config } from '@gluestack-ui/config';
import { GluestackUIProvider, SafeAreaView } from '@gluestack-ui/themed';
import { Slot } from 'expo-router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Platform } from 'react-native';
import { SessionProvider } from '../providers/SessionProvider';
import { scopes } from '../constants';

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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GluestackUIProvider config={config}>
        <SessionProvider>
          {Platform.OS === 'web' ? (
            <GoogleOAuthProvider
              clientId={process.env.EXPO_PUBLIC_GAUTH_WEB_CLIENT_ID}
            >
              <Slot />
            </GoogleOAuthProvider>
          ) : (
            <Slot />
          )}
        </SessionProvider>
      </GluestackUIProvider>
    </SafeAreaView>
  );
}
