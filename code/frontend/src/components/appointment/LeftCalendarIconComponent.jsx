import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function LeftCalendarComponent({ date }) {
  const theme = useTheme();

  console.log(date);
  const parsedDate = new Date(date);
  const day = parsedDate.getDay();
  const month = Intl.DateTimeFormat('en-Us', { month: 'short' }).format(
    parsedDate
  );
  const year = parsedDate.getFullYear();

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.onPrimary,
        },
        styles.container,
      ]}
    >
      <View
        style={{
          backgroundColor: 'red',
          width: '100%',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <Text
          style={[
            styles.text,
            {
              fontSize: 64 / 5,
              color: 'white',
            },
          ]}
          numberOfLines={1}
        >
          {year}
        </Text>
      </View>
      <Text
        style={[
          styles.text,
          {
            fontSize: 64 / 2,
            fontWeight: 'bold',
            // lineHeight: 64 / fontScale,
          },
        ]}
        numberOfLines={1}
      >
        {day}
      </Text>
      <Text
        style={[
          styles.text,
          {
            fontSize: 64 / 5,
            // lineHeight: 64 / fontScale,
          },
        ]}
        numberOfLines={1}
      >
        {month}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
