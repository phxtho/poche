/* Manage the editor's interaction with the db & global state */
import React, { useCallback, useEffect, useReducer, useRef } from "react";
import Editor from "components/remirror-editor/remirror-editor";
import { insertNote, updateNote, getNoteById } from "db/pouch/notes";
import { INote } from "model/interfaces";
import { useState } from "react";
import { ReactFrameworkOutput } from "@remirror/react";
import { Extension } from "@remirror/core";
import NoteOptionsModal from "components/note-options-modal/note-options-modal";

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
const EditorContainer = (props: EditorContainerProps) => {
  const [note, dispatch] = useReducer(reducer, props.note);
  const [focused, setFocused] = useState(false);
  const [noteOptionsOpen, setNoteOptionsOpen] = useState<boolean>(false);

  const ctxRef = useRef<ReactFrameworkOutput<Extension>>();

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

  const handleOnChange = useCallback((params) => {
    dispatch({
      type: SET_NOTE_STATE,
      payload: params.state.toJSON(),
    });
  }, []);

  const handleBlur = useCallback(
    (params, e) => {
      note.text = ctxRef.current.getState().doc.textContent;
      void updateNote(note);
      setFocused(false);
    },
    [note]
  );

  if (!note) return null;

  return (
    <>
      <div className="w-full md:w-5/12 lg:w-1/3 shadow-lg rounded-lg p-5 lg:mr-4 mb-4">
        <div className="flex justify-between">
          <textarea
            placeholder="Title"
            defaultValue={note?.title}
            className="font-medium text-3xl w-11/12"
            onChange={(e) => {
              let title = e.target.value;
              title.replace(/\n/, "");
              note.title = title;
              updateNote(note);
            }}
            wrap="soft"
          />
          <div className="flex space-x-2">
            <button
              className="h-4 w-4 rounded-full bg-green-300 hover:bg-green-500"
              onClick={() => setNoteOptionsOpen(true)}
            />
          </div>
        </div>
        <Editor
          state={note.state}
          onChange={handleOnChange}
          onBlur={handleBlur}
          onFocus={() => setFocused(true)}
          ref={ctxRef}
        />
      </div>
      <NoteOptionsModal
        isOpen={noteOptionsOpen}
        note={note}
        onRequestClose={() => {
          setNoteOptionsOpen(false);
        }}
      />
    </>
  );
};

export default EditorContainer;
