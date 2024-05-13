import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text, TextInput, useTheme } from 'react-native-paper';

export default function TimeInput({ onChange, value }) {
  const theme = useTheme();

  const handleIncrement = () => {
    onChange(1);
  };
  const handleDecrement = () => {
    onChange(-1);
  };

  return (
    <View style={styles.column}>
      <IconButton
        icon='plus'
        onPress={() => handleIncrement()}
      />
      <View style={[styles.root, { marginBottom: 3 }]}>
        <TextInput
          editable={false}
          maxFontSizeMultiplier={1.5}
          value={value.toString().padStart(2, '0')}
          maxLength={2}
          style={[
            styles.input,
            {
              fontFamily: theme.fonts.titleMedium.fontFamily,
              fontSize: 57,
              backgroundColor: theme.colors.primaryContainer,
              borderRadius: theme.roundness * 2,
              borderColor: theme.colors.onPrimaryContainer,
              borderWidth: 1.5,
              height: 80,
            },
          ]}
        />
      </View>
      <IconButton
        icon='minus'
        onPress={() => handleDecrement(-1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: { position: 'relative', height: 80, width: 96 },
  input: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 96,
  },
});
