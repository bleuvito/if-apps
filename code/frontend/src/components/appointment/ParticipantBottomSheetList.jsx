import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { useSession } from '../../providers/SessionProvider';
import ListEmpty from '../ListEmpty';
import LoadingIndicator from '../LoadingIndicator';
import ParticipantBottomSheetListItem from './ParticipantBottomSheetListItem';

export default function ParticipantBottomSheetList({
  search,
  selectedParticipant,
  setSelectedParticipant,
}) {
  const { session } = useSession();

  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredParticipants = participants.filter((participant) => {
    return participant.name.toLowerCase().includes(search.toLowerCase());
  });

  const getUsers = async () => {
    setIsLoading(true);

    const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/user/invitee`;
    try {
      const { data } = await axios.get(getUri, {
        headers: { Authorization: `Bearer ${session}` },
      });

      setParticipants(data);
    } catch (error) {
      console.error('error getting users', error);
    }

    setIsLoading(false);
  };

  const renderItem = useCallback(({ item }) => {
    return (
      <ParticipantBottomSheetListItem
        participant={item}
        selectedParticipant={selectedParticipant}
        setSelectedParticipant={setSelectedParticipant}
      />
    );
  });

  const renderListEmpty = useCallback(() => {
    return <ListEmpty itemType='partisipan' />;
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <BottomSheetFlatList
      data={filteredParticipants}
      keyExtractor={(participant) => participant.id}
      style={{ width: '100%', flexGrow: 1 }}
      renderItem={renderItem}
      ListEmptyComponent={renderListEmpty}
    />
  );
}
