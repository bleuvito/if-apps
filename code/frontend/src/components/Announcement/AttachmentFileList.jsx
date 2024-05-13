import { Card } from 'react-native-paper';
import AttachmentFileChip from './AttachmentFileChip';

export default function AttachmentFileList({ files, setFiles }) {
  return (
    <Card mode='outlined'>
      <Card.Content>
        {files.map((file, index) => {
          return (
            <AttachmentFileChip
              key={index}
              idx={index}
              name={file.file.name}
              files={files}
              setFiles={setFiles}
            />
          );
        })}
      </Card.Content>
    </Card>
  );
}
