import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Icon, Pressable } from '@gluestack-ui/themed';
import { Menu } from 'lucide-react-native';
import { Platform } from 'react-native';

export default function BurgerMenuButton() {
  const navigation = useNavigation();

  function handlePress() {
    navigation.dispatch(DrawerActions.openDrawer());
  }

  let props = {
    asChild: true,
    onPress: handlePress,
    mr: '$12',
  };

  if (Platform.OS === 'web') props = { ...props, mr: '$4', ml: '$4' };

  return (
    <Pressable {...props}>
      <Icon as={Menu} />
    </Pressable>
  );
}
