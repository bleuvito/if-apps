import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import RoleCheckBox from './RoleCheckBox';

const RolesBottomSheet = forwardRef(
  ({ selectedRole, setSelectedRole }, ref) => {
    const snapPoints = useMemo(() => ['30%', '50%'], []);
    const roles = useMemo(
      () => ['MAHASISWA', 'DOSEN', 'KALAB', 'KAPRODI', 'KAJUR', 'ADMIN'],
      []
    );

    const renderBackdrop = useCallback((props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ));

    const renderItem = useCallback(({ item, index }) => {
      return (
        <RoleCheckBox
          key={index}
          currRole={item}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
      );
    });

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
            data={roles}
            renderItem={renderItem}
          />
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default RolesBottomSheet;

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
