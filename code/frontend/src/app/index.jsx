import { Redirect } from 'expo-router';

export default function App() {
  return <Redirect href='/announcement' />;
}

// import { Box, Button, ButtonText } from '@gluestack-ui/themed';
// import { router } from 'expo-router';
// import { useSession } from '../../providers/SessionProvider';
// import { Platform } from 'react-native';

// export default function App() {
//   const { signOut } = useSession();

//   let handleSignout;
//   if (Platform.OS === 'web') {
//     const { googleLogout } = require('@react-oauth/google');

//     handleSignout = () => {
//       try {
//         googleLogout();
//         signOut();
//         router.replace('/');
//       } catch (error) {
//         console.error('Error signing out user on web: ', error);
//       }
//     };
//   } else {
//     const {
//       GoogleSignin,
//     } = require('@react-native-google-signin/google-signin');

//     handleSignout = async () => {
//       try {
//         await GoogleSignin.signOut();
//         signOut();
//         router.replace('/');
//       } catch (error) {
//         console.error('Error signing out user on Android: ', error);
//       }
//     };
//   }

//   return (
//     <Box
//       width='100%'
//       height='100%'
//       justifyContent='center'
//       alignItems='center'
//     >
//       <Button
//         onPress={() => {
//           handleSignout();
//         }}
//       >
//         <ButtonText>Sign out</ButtonText>
//       </Button>
//     </Box>
//   );
// }
