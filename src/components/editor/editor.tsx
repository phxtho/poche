import React, { useCallback, useEffect, useRef, useState } from "react";
import { EditorState } from "prosemirror-state";
import { DirectEditorProps, EditorView } from "prosemirror-view";
import { schema } from "./schema";
import { basicPlugins } from "./plugins";
import "./editor.css";

interface EditorProps {
  onFocus?;
  onBlur?;
  onChange?;
}

const Editor = (props: EditorProps) => {
  const { onFocus, onBlur, onChange } = props;
  const editorRef = useRef();
  const [editorView, setEditorView] = useState<EditorView>(null);

  const generateEditorViewProps = useCallback(() => {
    return {
      dispatchTransaction(tr) {
        const newState = this.state.apply(tr);
        this.updateState(newState);
        onChange?.(this);
      },
      handleDOMEvents: {
        focus: (view: EditorView, event: FocusEvent) => {
          const transaction = view.state.tr.setMeta("focused", true);
          view.dispatch(transaction);
          onFocus?.(editorView);
          return false;
        },
        blur: (view: EditorView, event: FocusEvent) => {
          const transaction = view.state.tr.setMeta("focused", false);
          view.dispatch(transaction);
          onBlur?.(editorView);
          return false;
        },
      },
    };
  }, [onChange, onBlur, onFocus, editorView]);

  // Initialise the editor view
  useEffect(() => {
    const editorState = EditorState.create({
      schema: schema,
      plugins: basicPlugins,
    });

    const editorProps: DirectEditorProps = {
      state: editorState,
      ...generateEditorViewProps(),
    };

    const editorView = new EditorView(editorRef.current, editorProps);
    setEditorView(editorView);

    return () => {
      editorView.destroy();
    };
  }, []);

  useEffect(() => {
    // Update the editor props to sync callbacks
    editorView?.setProps(generateEditorViewProps());
  }, [generateEditorViewProps, editorView]);

  return (
    <div id="editorContainer">
      <div id="editor" ref={editorRef}></div>
    </div>
  );
};

export default Editor;
