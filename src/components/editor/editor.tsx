import React, { useEffect, useRef, useState } from "react";
import {EditorState} from 'prosemirror-state'
import {DirectEditorProps, EditorView} from 'prosemirror-view'
import {schema}  from "../../model/schema"
import {exampleSetup} from "prosemirror-example-setup"
import './editor.css'

interface EditorProps {
  onFocus?,
  onBlur?
}

const Editor = (props: EditorProps) => {
  const createPlugins = () => {
    try {
      return exampleSetup({schema: schema, menuBar: false}) 
    } catch (error) {
      console.warn(`couldn't create editor plugins: ${error}`)
    }
  }

  const createEditorViewProps = (editorState: EditorState):DirectEditorProps => {
    const editorProps: DirectEditorProps = {state: editorState, handleDOMEvents: {
      focus: (view: EditorView, event: FocusEvent) => {
        const transaction = view.state.tr.setMeta('focused', true)
        view.dispatch(transaction)
        props.onFocus && props.onFocus();
        return false
      },
      blur: (view: EditorView, event: FocusEvent) => {
        const transaction = view.state.tr.setMeta('focused', false)
        view.dispatch(transaction)
        props.onBlur && props.onBlur()
        return false
      }}}
    
      return editorProps
  }

  
  const editorRef = useRef()
  const [, setEditorView] = useState<EditorView>(null);
  
  useEffect(()=>{
    // Initialise the editor view
    const editorState = EditorState.create({schema: schema, plugins: createPlugins()})
    const editorView = new EditorView(editorRef.current, createEditorViewProps(editorState))
    setEditorView(editorView)
  },[])

 return <div id="editorContainer">
   <div id="editor" ref={editorRef}></div>
 </div>
}

export default Editor