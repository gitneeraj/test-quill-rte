import RickTextEditor from "quill";
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

const Editor = forwardRef(
  (
    {
      readOnly,
      defaultValue,
      onTextChange,
      onSelectionChange,
      onChange,
      sx = {},
      isError = false,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div"),
      );
      const editor = new RickTextEditor(editorContainer, {
        theme: "snow",
        readOnly,
      });

      ref.current = editor;

      if (defaultValueRef.current) {
        editor.setContents(defaultValueRef.current);
      }

      editor.on(RickTextEditor.events.TEXT_CHANGE, () => {
        onChange(editor.getSemanticHTML(), editor);
      });

      editor.on(RickTextEditor.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = "";
      };
    }, [ref]);

    return <div ref={containerRef} {...props} />;
  },
);

Editor.displayName = "Editor";

export default Editor;
