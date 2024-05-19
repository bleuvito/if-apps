import dayjs from 'dayjs';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { typeColor } from '../../constants';

export default function Event({ event, touchableOpacityProps }) {
  function formatStartEnd(start, end, format) {
    return `${dayjs(start).format(format)}-${dayjs(end).format(format)}`;
  }

  return (
    <TouchableOpacity
      {...touchableOpacityProps}
      style={[
        ...touchableOpacityProps.style,
        { backgroundColor: typeColor[event.type] },
      ]}
    >
      <Text
        variant='bodySmall'
        numberOfLines={2}
        style={{ fontWeight: 'bold', color: 'white' }}
      >
        {event.title}
      </Text>
      <Text
        variant='bodySmall'
        numberOfLines={2}
        style={{ color: 'white' }}
      >
        {formatStartEnd(event.start, event.end, 'HH:mm')}
      </Text>
      {event.children && event.children}
    </TouchableOpacity>
  );
}
