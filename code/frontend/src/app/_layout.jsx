import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
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
  if (Platform.OS === 'web') {
    return (
      <GluestackUIProvider config={config}>
        <SessionProvider>
          <GoogleOAuthProvider
            clientId={process.env.EXPO_PUBLIC_GAUTH_WEB_CLIENT_ID}
          >
            <Slot />
          </GoogleOAuthProvider>
        </SessionProvider>
      </GluestackUIProvider>
    );
  }

  return (
    <GluestackUIProvider config={config}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </GluestackUIProvider>
  );
}
