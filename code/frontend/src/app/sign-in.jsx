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
      {/* <View style={{ height: 300, aspectRatio: 1 }}> */}
      <Image
        source={require('../../assets/logo.png')}
        style={{ height: 300, width: 300, aspectRatio: 1 }}
      />
      {/* </View> */}
      {error && (
        <Text style={{ color: 'red', marginBottom: 8 }}>
          Harap berikan semua izin akses.
        </Text>
      )}
      <SignInWithGoogleButton handleError={setError} />
    </View>
  );
}
