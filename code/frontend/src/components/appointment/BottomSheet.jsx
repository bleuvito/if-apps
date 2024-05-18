import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSession } from '../../providers/SessionProvider';
import ParticipantCheckbox from './ParticipantCheckbox';

const BottomSheet = forwardRef(
  ({ selectedParticipant, setSelectedParticipant }, ref) => {
    const { session } = useSession();
    const snapPoints = useMemo(() => ['50%', '75%'], []);
    const [participants, setParticipants] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const renderBackdrop = useCallback((props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ));
    const handleRefresh = useCallback(async () => {
      setRefreshing(true);
      await getUsers();
      setRefreshing(false);
    }, []);
    const renderItem = useCallback(({ item }) => {
      return (
        <ParticipantCheckbox
          participant={item}
          selectedParticipant={selectedParticipant}
          setSelectedParticipant={setSelectedParticipant}
        />
      );
    });
    const getUsers = async () => {
      setIsLoading(true);

      const getUri = `${process.env.EXPO_PUBLIC_BASE_URL}/user`;
      const { data } = await axios.get(getUri, {
        headers: { Authorization: `Bearer ${session}` },
      });
      setParticipants(data);

      setIsLoading(false);
    };

    useFocusEffect(
      useCallback(() => {
        getUsers();
      }, [])
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        topInset={50}
      >
        <BottomSheetView style={styles.contentContainer}>
          <BottomSheetFlatList
            data={participants}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            keyExtractor={(participant) => participant.id}
            renderItem={renderItem}
          />
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
  },
});

export default BottomSheet;
