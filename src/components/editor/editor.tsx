import React, { useCallback, useEffect, useRef, useState } from "react";
import { EditorState, Selection } from "prosemirror-state";
import { DirectEditorProps, EditorView } from "prosemirror-view";
import { schema } from "./schema";
import { basicPlugins } from "./plugins";
import "./editor.css";
import { PMState } from "@/model/interfaces";

interface EditorProps {
  onFocus?;
  onBlur?;
  onChange?;
  state?: PMState;
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

  const generateEditorState = useCallback((): EditorState => {
    let options: any = {
      schema: schema,
      plugins: basicPlugins,
    };

    if (props.state?.doc) {
      options.doc = schema.nodeFromJSON(props.state.doc);

      if (props.state?.selection) {
        options.selection = Selection.fromJSON(
          options.doc,
          props.state.selection
        );
      }
    }

    return EditorState.create(options);
  }, [props.state]);

  // Initialise the editor view
  useEffect(() => {
    const editorProps: DirectEditorProps = {
      state: generateEditorState(),
      ...generateEditorViewProps(),
    };

    const editorView = new EditorView(editorRef.current, editorProps);
    setEditorView(editorView);

    return () => {
      editorView.destroy();
    };
  }, []);

  // Update the editor props to sync editor event callbacks
  useEffect(() => {
    editorView?.setProps(generateEditorViewProps());
  }, [generateEditorViewProps, editorView]);

  // Update editor state to sync with state prop
  useEffect(() => {
    editorView?.updateState(generateEditorState());
  }, [generateEditorState, editorView]);

  return (
    <div id="editorContainer">
      <div id="editor" ref={editorRef}></div>
    </div>
  );
};

export default Editor;
