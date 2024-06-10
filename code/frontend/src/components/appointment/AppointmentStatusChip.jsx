import { Chip, Text, useTheme } from 'react-native-paper';

export default function AppointmentStatusChip({ data }) {
  const theme = useTheme();

  let config;
  switch (data) {
    case 'PENDING':
      config = { backgroundColor: '#E5E800', text: data };
      break;
    case 'DECLINED':
      config = {
        backgroundColor: theme.colors.error,
        text: data,
      };
      break;
    case 'ACCEPTED':
      config = { backgroundColor: '#51AC83', text: data };
      break;
    case 'RESCHEDULE':
      config = { backgroundColor: '#E5E800', text: data };
      break;
    default:
      config = { backgroundColor: '#E5E800', text: data };
      break;
  }

  return (
    <Chip
      compact={true}
      style={{
        backgroundColor: config.backgroundColor,
        alignSelf: 'flex-start',
        // borderRadius: 200,
      }}
    >
      <Text
        variant='labelSmall'
        style={{ color: theme.colors.onError }}
      >
        {config.text}
      </Text>
    </Chip>
  );
}
