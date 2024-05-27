import { HelperText } from 'react-native-paper';

export default function InputHelper({ error, message }) {
  if (!error) {
    return null;
  }

  return (
    <HelperText
      type='error'
      visible={true}
    >
      {message}
    </HelperText>
  );
}
