import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

export default function Editor({ value, onChange }) {
  const formats = ['bold', 'italic', 'underline', 'list', 'bullet', 'link'];

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ],
  };

  return (
    <ReactQuill
      theme='snow'
      modules={modules}
      formats={formats}
      value={value}
      onChange={onChange}
    />
  );
}
