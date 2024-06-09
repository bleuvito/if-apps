import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { ConfirmationDialog, useConfirmation } from './ConfirmationDialog';

export default function FormActionButtons({ onSubmit }) {
  const { visible, showDialog, hideDialog } = useConfirmation();

  return (
    <View style={styles.container}>
      <Button
        mode='outlined'
        style={styles.button}
        onPress={() => showDialog()}
      >
        Batal
      </Button>
      <ConfirmationDialog
        visible={visible}
        hideDialog={hideDialog}
      />
      <Button
        mode='contained'
        onPress={onSubmit}
        style={styles.button}
      >
        Simpan
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 96,
  },
  button: { flex: 1 },
});
