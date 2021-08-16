/* Manage the editor's interaction with the db & global state */
import React, { useCallback, useEffect, useReducer } from "react";
import Editor from "./editor";
import { insertNote, updateNote, getNoteById } from "db/pouch/notes";
import { INote } from "model/interfaces";
import { EditorView } from "prosemirror-view";

interface EditorContainerProps {
  id?: string;
  note?: INote;
}

const SET_NOTE = "SET_NOTE";
const SET_NOTE_STATE = "SET_NOTE_STATE";
const NEW_NOTE = "NEW_NOTE";

const reducer = (note: INote, { type, payload }) => {
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
    case SET_NOTE_STATE:
      const updatedNote = {
        ...note,
        state: payload,
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
    dispatch({
      type: SET_NOTE_STATE,
      payload: editorView?.state?.toJSON(),
    });
  }, []);

  const handleBlur = useCallback(
    (editorView: EditorView) => {
      void updateNote(localNote);
    },
    [localNote]
  );

  return (
    <>
      <Editor
        state={localNote?.state}
        onChange={handleOnChange}
        onBlur={handleBlur}
      />
    </>
  );
};

export default Container;
