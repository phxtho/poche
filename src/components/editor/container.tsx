/* Manage the editor's interaction with the db */
import React, { useCallback, useEffect, useReducer } from "react";
import Editor from "./editor";
import { insertNote, updateNote, getNoteById } from "db/pouch/notes";
import { Note } from "model/interfaces";
import { EditorView } from "prosemirror-view";

interface EditorContainerProps {
  id?: string;
  note?: Note;
}

const SET_NOTE = "SET_NOTE";
const SET_BODY = "SET_BODY";
const NEW_NOTE = "NEW_NOTE";

const reducer = (note: Note, { type, payload }) => {
  switch (type) {
    case SET_NOTE:
      return payload;
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

  const initialiseNote = useCallback(async () => {
    if (props.id) {
      // try fetch the note from the db
      let doc = await getNoteById(props.id);
      if (doc) {
        dispatch({ type: SET_NOTE, payload: doc });
      } else {
        // No note found create one with the passed in id
        const doc = await insertNote(props.id);
        dispatch({ type: NEW_NOTE, payload: doc });
      }
    } else {
      // No id create note with db generated id
      const doc = await insertNote();
      dispatch({ type: NEW_NOTE, payload: doc });
    }
  }, [props.id]);

  // On init
  useEffect(() => {
    void initialiseNote();
  }, [initialiseNote]);

  const handleOnChange = useCallback((editorView: EditorView) => {
    dispatch({ type: SET_BODY, payload: editorView?.state?.toJSON() });
  }, []);

  const handleBlur = useCallback(() => {
    void updateNote(localNote);
  }, [localNote]);

  return (
    <>
      <Editor onChange={handleOnChange} onBlur={handleBlur} />
    </>
  );
};

export default Container;
