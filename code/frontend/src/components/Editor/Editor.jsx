import { Platform } from 'react-native';

const Component = Platform.select({
  native: require('./Editor.android.jsx'),
  web: require('./Editor.web.jsx'),
});

export default Component;
