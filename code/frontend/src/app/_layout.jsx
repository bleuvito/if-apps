import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Slot } from 'expo-router';
import { SessionProvider } from '../providers/SessionProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Platform } from 'react-native';

export default function Layout() {
  if (Platform.OS === 'web') {
    return (
      <GluestackUIProvider config={config}>
        <GoogleOAuthProvider
          clientId={process.env.EXPO_PUBLIC_GAUTH_WEB_CLIENT_ID}
        >
          <SessionProvider>
            <Slot />
          </SessionProvider>
        </GoogleOAuthProvider>
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
