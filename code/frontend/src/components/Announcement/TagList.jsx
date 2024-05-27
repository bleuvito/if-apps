import { useController } from 'react-hook-form';
import { Card, useTheme } from 'react-native-paper';
import TagChip from './TagChip';

export default function TagList({ control, name }) {
  const theme = useTheme();
  const {
    field: { value: selectedTags, onChange: setSelectedTags },
  } = useController({ control, name });
  return (
    <Card
      mode='outlined'
      style={{ borderColor: theme.colors.outline, borderRadius: 4 }}
    >
      <Card.Content style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
        {selectedTags.map((selectedTag) => {
          return (
            <TagChip
              key={selectedTag.id}
              id={selectedTag.id}
              name={selectedTag.name}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          );
        })}
      </Card.Content>
    </Card>
  );
}
