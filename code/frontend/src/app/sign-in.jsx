import { useState } from 'react';
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';

import SignInWithGoogleButton from '../components/SignInWithGoogleButton';

export default function SignInScreen() {
  const [error, setError] = useState(null);

  return (
    <View
      style={{
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('../../assets/logo.png')}
        style={{ aspectRatio: 1, height: 300 }}
      />
      <SignInWithGoogleButton handleError={setError} />
    </View>
  );
}
