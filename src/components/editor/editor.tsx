import React, { useEffect, useRef, useState } from "react";
import { EditorState } from "prosemirror-state";
import { DirectEditorProps, EditorView } from "prosemirror-view";
import { schema } from "./schema";
import { basicPlugins } from "./plugins";
import "./editor.css";

interface EditorProps {
  onFocus?;
  onBlur?;
}

const Editor = (props: EditorProps) => {
  const editorRef = useRef();
  const [, setEditorView] = useState<EditorView>(null);

  // Initialise the editor view
  useEffect(() => {
    const editorState = EditorState.create({
      schema: schema,
      plugins: basicPlugins,
    });

    const editorProps: DirectEditorProps = {
      state: editorState,
      handleDOMEvents: {
        focus: (view: EditorView, event: FocusEvent) => {
          const transaction = view.state.tr.setMeta("focused", true);
          view.dispatch(transaction);
          props.onFocus && props.onFocus();
          return false;
        },
        blur: (view: EditorView, event: FocusEvent) => {
          const transaction = view.state.tr.setMeta("focused", false);
          view.dispatch(transaction);
          props.onBlur && props.onBlur();
          return false;
        },
      },
    };

    const editorView = new EditorView(editorRef.current, editorProps);
    setEditorView(editorView);
  }, []);

  return (
    <div id="editorContainer">
      <div id="editor" ref={editorRef}></div>
    </div>
  );
};

export default Editor;
