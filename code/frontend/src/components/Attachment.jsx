import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  HStack,
} from '@gluestack-ui/themed';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Plus } from 'lucide-react-native';
import AttachmentChip from './AttachmentChip';

export default function Attachment({ selectedFiles, setSelectedFiles }) {
  async function handleSelectFile() {
    const { assets, canceled } = await DocumentPicker.getDocumentAsync({
      multiple: true,
      copyToCacheDirectory: true,
    });

    if (canceled) return;

    setSelectedFiles([...selectedFiles, ...assets]);
  }

  async function handleDeleteAttachment(itemIdx) {
    let uri;
    const filteredList = selectedFiles.filter((item, index) => {
      if (itemIdx === index) {
        uri = item.uri;
      }
      return index !== itemIdx;
    });
    await FileSystem.deleteAsync(uri);
    setSelectedFiles(filteredList);
  }

  return (
    <FormControl>
      <HStack
        alignItems='center'
        justifyContent='space-between'
      >
        <FormControlLabel>
          <FormControlLabelText>Attachment</FormControlLabelText>
        </FormControlLabel>
        <Button
          variant='link'
          action='primary'
          onPress={handleSelectFile}
        >
          <ButtonText>Select File</ButtonText>
          <ButtonIcon as={Plus} />
        </Button>
      </HStack>
      <Box
        borderWidth='$1'
        borderRadius='$md'
        borderColor='$borderLight200'
        p='$2'
      >
        <HStack
          flexWrap='wrap'
          space='md'
        >
          {selectedFiles.map((item, index) => {
            return (
              <AttachmentChip
                key={index}
                itemIdx={index}
                item={item}
                onDeleteAttachment={handleDeleteAttachment}
              />
            );
          })}
        </HStack>
      </Box>
    </FormControl>
  );
}
