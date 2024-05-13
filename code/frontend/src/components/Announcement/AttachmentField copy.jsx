import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Platform, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import AttachmentFileList from './AttachmentFileList';

export default function AttachmentField({ files, setFiles }) {
  async function handlePickFile() {
    const { assets, canceled, output } = await DocumentPicker.getDocumentAsync({
      multiple: true,
    });

    if (canceled) return;

    let selectedFiles = assets;
    if (Platform.OS === 'android') {
      const encodeToBase64 = assets.map(async (asset) => {
        const base64String = await FileSystem.readAsStringAsync(asset.uri, {
          encoding: 'base64',
        });
        const uri = `data:${asset.mimeType};base64,${base64String}`;
        await FileSystem.deleteAsync(asset.uri);

        return { ...asset, uri };
      });

      selectedFiles = await Promise.all(encodeToBase64);
    }

    selectedFiles = selectedFiles.map((selectedFile, index) => {
      const id = files.length + index;
      return { ...selectedFile, id };
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
        <Text variant='titleMedium'>Attachment</Text>
        <Button
          icon='plus'
          onPress={handlePickFile}
        >
          Add
        </Button>
      </View>
      <AttachmentFileList
        files={files}
        setFiles={setFiles}
      />
    </View>
  );
}
