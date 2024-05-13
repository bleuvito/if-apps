import { Card } from 'react-native-paper';
import TagChip from './TagChip';

export default function TagList({ selectedTags, setSelectedTags }) {
  return (
    <Card mode='outlined'>
      <Card.Content>
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
