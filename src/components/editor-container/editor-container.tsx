/* Manage the editor's interaction with the db & global state */
import React, { useCallback, useEffect, useRef } from "react";
import Editor from "components/remirror-editor/remirror-editor";
import { updateNote, getNoteById } from "db/pouch/notes";
import { useState } from "react";
import { ReactFrameworkOutput } from "@remirror/react";
import { Extension, RemirrorEventListenerProps } from "@remirror/core";
import NoteOptionsModal from "components/note-options-modal/note-options-modal";
import { useLocation } from "@reach/router";
import "./editor-container.css";

interface EditorContainerProps {
  id: string;
  handleFocus?;
}

const EditorContainer = (props: EditorContainerProps) => {
  const [note, setNote] = useState<any>();
  const [focused, setFocused] = useState(false);
  const [noteOptionsOpen, setNoteOptionsOpen] = useState<boolean>(false);

  const remirrorContextRef = useRef<ReactFrameworkOutput<Extension>>();
  const elRef = useRef<HTMLDivElement>();

  const location = useLocation();

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

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      if (props.id === id && elRef.current) {
        elRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash, props.id]);

  const handleOnChange = useCallback(
    (params: RemirrorEventListenerProps<Remirror.Extensions>) => {
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
    (params: RemirrorEventListenerProps<Remirror.Extensions>, e) => {
      note.text = params.helpers.getText();
      void updateNote(note);
      setFocused(false);
    },
    [note]
  );

  const handleFocus = useCallback(
    (params: RemirrorEventListenerProps<Remirror.Extensions>, e) => {
      setFocused(true);
      props.handleFocus?.(remirrorContextRef.current);
    },
    [props]
  );

  if (!note) return null;

  return (
    <>
      <div
        id={props.id}
        ref={elRef}
        className="w-full md:w-5/12 lg:w-1/3 shadow-lg rounded-lg p-5 lg:mr-4 mb-4 editor-container"
      >
        <div className="flex justify-between">
          <textarea
            placeholder="Title"
            defaultValue={note?.title}
            className="font-semibold text-4xl w-11/12"
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
              className={`h-4 w-4 rounded-full border hover:bg-gray-700 hover:border-gray-700 ${
                focused ? "border-black bg-black" : "border-gray-400"
              }`}
              onClick={() => setNoteOptionsOpen(true)}
            />
          </div>
        </div>
        <Editor
          state={note.state}
          onChange={handleOnChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          ref={remirrorContextRef}
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
