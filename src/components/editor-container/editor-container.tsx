/* Manage the editor's interaction with the db & global state */
import React, { useCallback, useEffect, useRef } from "react";
import Editor from "components/remirror-editor/remirror-editor";
import { updateNote, getNoteById } from "db/pouch/notes";
import { INote } from "model/interfaces";
import { useState } from "react";
import { ReactFrameworkOutput } from "@remirror/react";
import { Extension } from "@remirror/core";
import NoteOptionsModal from "components/note-options-modal/note-options-modal";

interface EditorContainerProps {
  id: string;
  handleFocus?;
}

const EditorContainer = (props: EditorContainerProps) => {
  const [note, setNote] = useState<any>();
  const [focused, setFocused] = useState(false);
  const [noteOptionsOpen, setNoteOptionsOpen] = useState<boolean>(false);

  const ctxRef = useRef<ReactFrameworkOutput<Extension>>();

  const initialiseNote = useCallback(async () => {
    if (props.id) {
      // try fetch the note from the db
      let doc = await getNoteById(props.id);
      if (doc) {
        setNote(doc);
      }
    }
  }, [props.id]);

  // On init
  useEffect(() => {
    void initialiseNote();
  }, [initialiseNote]);

  const handleOnChange = useCallback(
    (params) => {
      const updatedNote = {
        ...note,
        state: params.state.toJSON(),
        lastEditedTime: Date.now(),
      };
      setNote(updatedNote);
    },
    [note]
  );

  const handleBlur = useCallback(
    (params, e) => {
      note.text = ctxRef.current.getState().doc.textContent;
      void updateNote(note);
      setFocused(false);
    },
    [note]
  );

  const handleFocus = useCallback((params, e) => {
    setFocused(true);
    props.handleFocus?.(ctxRef.current);
  }, []);

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
              className="h-4 w-4 rounded-full bg-black hover:bg-gray-700"
              onClick={() => setNoteOptionsOpen(true)}
            />
          </div>
        </div>
        <Editor
          state={note.state}
          onChange={handleOnChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
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
