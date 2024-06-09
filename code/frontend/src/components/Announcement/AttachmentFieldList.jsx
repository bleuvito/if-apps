import { Card, useTheme } from 'react-native-paper';
import AttachmentFieldListItem from './AttachmentFieldListItem';

export default function AttachmentFieldList({ files, setFiles }) {
  const theme = useTheme();

  return (
    <Card
      mode='outlined'
      style={{ borderColor: theme.colors.outline, borderRadius: 4 }}
    >
      <Card.Content style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
        {files.map((file, index) => {
          return (
            <AttachmentFieldListItem
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
