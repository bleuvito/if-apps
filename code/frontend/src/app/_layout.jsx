import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Slot } from 'expo-router';
import { SessionProvider } from '../providers/AuthProvider';

export default function Layout() {
  return (
    <GluestackUIProvider config={config}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </GluestackUIProvider>
  );
}
