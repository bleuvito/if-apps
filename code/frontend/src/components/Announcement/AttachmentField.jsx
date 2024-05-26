import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Platform, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import AttachmentFileList from './AttachmentFileList';

export default function AttachmentField({ files, setFiles }) {
  async function handlePickFile() {
    const { assets, canceled, output } = await DocumentPicker.getDocumentAsync({
      multiple: true,
      copyToCacheDirectory: true,
    });

    if (canceled) return;

    let selectedFiles = Platform.OS === 'android' ? assets : Array.from(output);
    selectedFiles = selectedFiles.map((selectedFile, index) => {
      const id = files.length + index;
      return { id, file: selectedFile };
    });

    setFiles([...files, ...selectedFiles]);
  }

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text variant='bodyMedium'>Lampiran</Text>
        <Button
          icon='plus'
          onPress={handlePickFile}
        >
          Tambah
        </Button>
      </View>
      <AttachmentFileList
        files={files}
        setFiles={setFiles}
      />
    </View>
  );
}
