import {
  Badge,
  BadgeIcon,
  BadgeText,
  Button,
  ButtonIcon,
  VStack,
} from '@gluestack-ui/themed';
import { File, X } from 'lucide-react-native';

export default function AttachmentChip({ itemIdx, item, onDeleteAttachment }) {
  const { name, size } = item;

  const parseSize = (size) => {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let threshold = 1024;
    let idx = 0;

    while (size >= threshold && idx < units.length - 1) {
      size /= threshold;
      idx++;
      threshold *= 1024;
    }

    return size.toFixed(1) + ' ' + units[idx];
  };

  return (
    <Badge
      variant='outline'
      action='info'
      size='lg'
      borderRadius='$md'
      px='$2.5'
      py='$1'
    >
      <BadgeIcon
        as={File}
        mr='$2'
      />
      <VStack mr='$3'>
        <BadgeText
          bold
          textTransform='none'
          numberOfLines={1}
          ellipsizeMode='middle'
        >
          {name}
        </BadgeText>
        <BadgeText size='xs'>{parseSize(size)}</BadgeText>
      </VStack>
      <Button
        variant='link'
        onPress={() => onDeleteAttachment(itemIdx)}
      >
        <ButtonIcon as={X} />
      </Button>
    </Badge>
  );
}
