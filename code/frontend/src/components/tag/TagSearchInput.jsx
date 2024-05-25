import { useEffect, useState } from 'react';
import { useTagList } from '../../hooks/useTagList';
import { useSession } from '../../providers/SessionProvider';
import SearchInput from '../SearchInput';

export default function TagSearchInput({ setTags }) {
  const { session } = useSession();
  const [search, setSearch] = useState('');

  const listTags = async () => {
    setTags(await useTagList(session, search));
  };

  useEffect(() => {
    listTags();
  }, [search]);

  return <SearchInput setSearch={setSearch} />;
}
