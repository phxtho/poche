/* Manage the editor's interaction with the db */
import React, { useCallback, useEffect, useReducer } from "react";
import Editor from "./editor";
import { insertNote, updateNote } from "db/pouch/notes";
import { Note } from "db/contants";
import { EditorView } from "prosemirror-view";

interface EditorContainerProps {
  note?: Note;
}

const SET_BODY = "SET_BODY";
const NEW_NOTE = "NEW_NOTE";

const reducer = (note: Note, { type, payload }) => {
  console.log(`${type}: ${JSON.stringify(payload)}`);

  switch (type) {
    case NEW_NOTE:
      let currentTime = Date.now();
      const newNote = {
        ...payload,
        createdTime: currentTime,
        lastEditedTime: currentTime,
      };
      return newNote;
    case SET_BODY:
      const updatedNote = {
        ...note,
        body: payload,
        lastEditedTime: Date.now(),
      };
      return updatedNote;
  }
};
const Container = (props: EditorContainerProps) => {
  const { note } = props;
  const [localNote, dispatch] = useReducer(reducer, note);

  useEffect(() => {
    if (!localNote)
      insertNote().then((res) => {
        console.log(`created ${JSON.stringify(res)}`);
        dispatch({ type: NEW_NOTE, payload: res });
      });
  }, [localNote]);

  const handleOnChange = useCallback((editorView: EditorView) => {
    dispatch({ type: SET_BODY, payload: editorView?.state?.toJSON() });
  }, []);

  const handleBlur = useCallback(() => {
    updateNote(localNote);
  }, [localNote]);

  return (
    <>
      <Editor onChange={handleOnChange} onBlur={handleBlur} />
    </>
  );
};

export default Container;
