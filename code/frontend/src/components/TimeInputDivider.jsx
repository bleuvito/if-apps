import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function TimeInputDivider() {
  const theme = useTheme();

  return (
    <View style={[styles.hoursAndMinutesSeparator]}>
      <View style={styles.spaceDot} />
      <View
        style={[
          styles.dot,
          {
            backgroundColor: theme.colors.onSurface,
          },
        ]}
      />
      <View style={styles.betweenDot} />
      <View
        style={[
          styles.dot,
          {
            backgroundColor: theme.colors.onSurface,
          },
        ]}
      />
      <View style={styles.spaceDot} />
    </View>
  );
}

const styles = StyleSheet.create({
  hoursAndMinutesSeparator: {
    fontSize: 65,
    width: 24,
    alignItems: 'center',
  },
  spaceDot: {
    flex: 1,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 7 / 2,
  },
  betweenDot: {
    height: 12,
  },
});
