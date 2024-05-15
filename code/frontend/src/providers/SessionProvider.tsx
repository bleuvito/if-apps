import JWT from 'expo-jwt';
import { PropsWithChildren, createContext, useContext } from 'react';
import { useStorageState } from '../hooks/useStorageState';

const AuthContext = createContext<{
  signIn: (token: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  getRole: () => string | null;
  getUserId: () => string | null;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  getRole: () => null,
  getUserId: () => null,
});

export function useSession() {
  return useContext(AuthContext);
}

export function SessionProvider(props: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: async (token: string) => {
          try {
            await setSession(token);
          } catch (error: any) {
            console.error(error.message);
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
        getRole: () => {
          try {
            const {
              user: { role },
            } = JWT.decode(
              session,
              `LK20+/B?Ey-r%4:F9<-A+,!CHxp4zmVG_~$_Lih5A!r^,CXJ`
            );

            return role;
          } catch (error) {
            console.error('Error getting role:', error);
          }
        },
        getUserId() {
          try {
            const {
              user: { id },
            } = JWT.decode(
              session,
              `LK20+/B?Ey-r%4:F9<-A+,!CHxp4zmVG_~$_Lih5A!r^,CXJ`
            );

            return id;
          } catch (error) {
            console.error('Error getting user id:', error);
          }
        },
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
