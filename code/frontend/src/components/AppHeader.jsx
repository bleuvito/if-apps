import { getHeaderTitle } from '@react-navigation/elements';
import { DrawerActions } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

export default function AppHeader({ navigation, route, options, back }) {
  const title = getHeaderTitle(options, route.name);
  const Right = options.headerRight || (() => null);

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
