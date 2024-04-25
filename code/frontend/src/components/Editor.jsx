import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

export default function Editor({ onChange, value }) {
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
