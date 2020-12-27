import React, { useEffect, useState } from "react";
import {EditorState} from 'prosemirror-state'
import {EditorView} from 'prosemirror-view'
import {schema}  from "../model/schema"
import {exampleSetup} from "prosemirror-example-setup"
import './editor.css'

const Editor = () => {
  const [editorView, setEditorView] = useState(null);

  const editorState = EditorState.create({schema: schema, plugins: exampleSetup({schema: schema})})
  
  useEffect(()=>{
    let newEditorView = new EditorView(document.querySelector("#editor"), {state: editorState})
    setEditorView(newEditorView)
  },[])

 return <div id="editorContainer">
   <div id="editor"></div>
 </div>
}

export default Editor