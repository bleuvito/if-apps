import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

export default function RichTextEditor({ onChange, defaultValue }) {
  const formats = [
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'indent',
    'link',
  ];

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['link'],
    ],
  };

  return (
    <ReactQuill
      theme='snow'
      defaultValue={defaultValue}
      modules={modules}
      formats={formats}
      onChange={onChange}
    />
  );
}
