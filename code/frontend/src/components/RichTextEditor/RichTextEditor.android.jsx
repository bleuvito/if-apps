import { useRef, useState } from 'react';
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
          iconTint='white'
          selectedIconTint={theme.colors.surfaceDisabled}
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
      <RichEditor
        ref={richText}
        onChange={onChange}
        initialContentHTML={defaultValue}
        editorInitializedCallback={() => setIsEditorAttached(true)}
      />
    </>
  );
}
