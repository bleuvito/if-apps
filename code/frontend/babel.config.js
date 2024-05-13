module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@expo/html-elements/babel',
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-paper/babel',
      'react-native-reanimated/plugin',
    ],
  };
};
