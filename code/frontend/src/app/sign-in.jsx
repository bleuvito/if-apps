import { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import SignInWithGoogleButton from '../components/SignInWithGoogleButton';

export default function SignInScreen() {
  const [error, setError] = useState(null);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>{error}</Text>
      <SignInWithGoogleButton handleError={setError} />
    </View>
  );
}
