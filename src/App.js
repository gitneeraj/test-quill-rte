import React, { useRef } from "react";
import Editor from "./Editor";

/** 
 * Example: 
 * const Delta = Quill.import('delta');
 * const defaultValue = new Delta()
          .insert('Hello')
          .insert('\n', { header: 1 })
          .insert('Some ')
          .insert('initial', { bold: true })
          .insert(' ')
          .insert('content', { underline: true })
          .insert('\n');

    <RickText
      isReadOnly
      defaultValue={defaultValue}
      onChange={(content, editor) => {}}
    />
*/
const App = ({
  isReadOnly = false,
  defaultValue,
  onChange = () => {},
  ...props
}) => {
  const editorRef = useRef();

  return (
    <div>
      <Editor
        ref={editorRef}
        readOnly={isReadOnly}
        defaultValue={defaultValue}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default App;
