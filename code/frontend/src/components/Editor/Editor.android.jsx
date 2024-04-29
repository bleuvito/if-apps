import { useRef } from 'react';
import {
  RichEditor,
  RichToolbar,
  actions,
} from 'react-native-pell-rich-editor';

export default function Editor({ value, onChange }) {
  const editor = useRef();

  return (
    <>
      <RichToolbar
        editor={editor}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
        ]}
      />
      <RichEditor
        ref={editor}
        initialContentHTML={value}
        onChange={onChange}
      />
    </>
  );
}
