import { getHeaderTitle } from '@react-navigation/elements';
import { DrawerActions } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppHeader({ navigation, route, options, back }) {
  const title = getHeaderTitle(options, route.name);
  const Right = options.headerRight || (() => null);
  const insets = useSafeAreaInsets();
  return (
    <Appbar.Header>
      {back ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : (
        <Appbar.Action
          icon='menu'
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      )}
      <Appbar.Content title={title} />
      <Right />
    </Appbar.Header>
  );
}
