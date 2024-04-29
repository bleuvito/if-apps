import { useSession } from '../providers/SessionProvider';

export async function refreshToken() {
  const { signIn, session } = useSession();
  const { data: serverTokenResponse } = await axios.post(
    `${process.env.EXPO_PUBLIC_BASE_URL}/tokens`,
    {
      clientJwt: session,
    }
  );

  const { data: serverToken } = serverTokenResponse;
  const { user, googleAccessToken } = JWT.decode(
    serverToken,
    'LK20+/B?Ey-r%4:F9<-A+,!CHxp4zmVG_~$_Lih5A!r^,CXJ'
  );
  signIn(serverToken);

  return { user, googleAccessToken };
}