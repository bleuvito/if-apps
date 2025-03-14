import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function LeftCalendarComponent({ date }) {
  const theme = useTheme();

  const parsedDate = new Date(date);
  const day = parsedDate.getDate();
  const month = Intl.DateTimeFormat('id-ID', { month: 'short' }).format(
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
              fontSize: 64 / 6,
              color: 'white',
            },
          ]}
          numberOfLines={1}
        >
          {year}
        </Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text
          style={[
            styles.text,
            {
              fontSize: 64 / 3,
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
              fontSize: 64 / 6,
              // lineHeight: 64 / fontScale,
            },
          ]}
          numberOfLines={1}
        >
          {month}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
