import { Button } from 'react-native-paper';
import { useFormError } from './FormError';

export default function CancelButton() {
  const { showDialog, hideDialog, visible, goBack, message, setMessage } =
    useFormError();

  return (
    <>
      <Button
        mode='outlined'
        style={{ flex: 1 }}
        onPress={() => showDialog()}
      >
        Batal
      </Button>
    </>
  );
}
