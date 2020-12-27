import React, { useRef } from "react";
import {EditorState} from 'prosemirror-state'
import {EditorView} from 'prosemirror-view'
import {schema}  from "../model/schema"

const Editor = () => {
  const editorRef = useRef(null);
  const editorState = EditorState.create({schema: schema})
  const prosemirrorView = new EditorView(editorRef.current || undefined, {state: editorState})

 return <div id="editor" ref={editorRef}></div>
}

export default Editor