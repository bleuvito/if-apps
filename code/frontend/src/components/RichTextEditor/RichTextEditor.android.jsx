import { useRef, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  RichEditor,
  RichToolbar,
  actions,
} from 'react-native-pell-rich-editor';

export default function RichTextEditor({ onChange, defaultValue }) {
  const richText = useRef(null);
  const theme = useTheme();
  const [editorAttached, setIsEditorAttached] = useState(false);

  return (
    <>
      {editorAttached && (
        <RichToolbar
          editor={richText}
          iconTint={theme.colors.onSurfaceDisabled}
          selectedIconTint={theme.colors.primary}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.outdent,
            actions.indent,
            actions.insertLink,
          ]}
        />
      )}
      <View style={{ maxHeight: 350 }}>
        <RichEditor
          ref={richText}
          onChange={onChange}
          initialContentHTML={defaultValue}
          initialHeight={350}
          style={{ height: 350, maxHeight: 350 }}
          editorInitializedCallback={() => setIsEditorAttached(true)}
        />
      </View>
    </>
  );
}
