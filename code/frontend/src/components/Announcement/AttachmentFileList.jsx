import { Card, useTheme } from 'react-native-paper';
import AttachmentFileChip from './AttachmentFileChip';

export default function AttachmentFileList({ files, setFiles }) {
  const theme = useTheme();

  return (
    <Card
      mode='outlined'
      style={{ borderColor: theme.colors.outline, borderRadius: 4 }}
    >
      <Card.Content style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
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
