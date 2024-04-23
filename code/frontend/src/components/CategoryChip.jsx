import { Badge, BadgeText } from '@gluestack-ui/themed';

export default function CategoryChip({ description }) {
  return (
    <Badge
      borderRadius={'$full'}
      px={'$4'}
      py={'$1'}
      action='muted'
      alignItems='center'
    >
      <BadgeText
        textTransform='none'
        color='black'
      >
        {description}
      </BadgeText>
    </Badge>
  );
}
