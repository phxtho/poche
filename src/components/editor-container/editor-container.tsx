/* Manage the editor's interaction with the db & global state */
import { useCallback, useEffect, useRef } from "react";
import Editor from "@/components/remirror-editor/remirror-editor";
import { updateNote, getNoteById } from "@/db/pouch/notes";
import { useState } from "react";
import { ReactFrameworkOutput, RemirrorContext } from "@remirror/react";
import { Extension } from "@remirror/core";
import NoteOptionsModal from "@/components/note-options-modal/note-options-modal";
import { useLocation } from "react-router-dom";
import ExportOption from "@/components/export-options/export-options";
import "./editor-container.css";
import { AnimatePresence, motion } from "framer-motion";
import { INote } from "@/model/interfaces";

interface EditorContainerProps {
  id: string;
  handleFocus?;
}

const EditorContainer = (props: EditorContainerProps) => {
  const [note, setNote] = useState<INote>();
  const [focused, setFocused] = useState(false);
  const [noteOptionsOpen, setNoteOptionsOpen] = useState<boolean>(false);

  const remirrorContextRef = useRef<ReactFrameworkOutput<Extension>>();
  const elRef = useRef<HTMLDivElement>();

  const location = useLocation();

  const initialiseNote = useCallback(async () => {
    if (props.id) {
      // try fetch the note from the db
      let note = (await getNoteById(props.id)) as unknown as INote;

      if (note) {
        setNote(note);
      }
    }
  }, [props.id]);

  // On init
  useEffect(() => {
    void initialiseNote();

    return () => setNote(null);
  }, [initialiseNote]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); // remove leading #
      // Scroll note into view
      if (props.id === id && elRef.current) {
        elRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash, props.id]);

  const handleOnChange = useCallback(
    (doc: any) => {
      const updatedNote = {
        ...note,
        doc: doc,
        lastEditedTime: Date.now(),
      };
      setNote(updatedNote);
    },
    [note]
  );

  const handleBlur = useCallback(
    (docText: string) => {
      note.text = docText;
      void updateNote(note);
      setFocused(false);
    },
    [note]
  );

  const handleFocus = useCallback(() => {
    setFocused(true);
    props.handleFocus?.(remirrorContextRef.current);
  }, [props]);

  if (!note) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          id={props.id}
          ref={elRef}
          className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 hover:shadow-lg rounded-lg p-5 lg:mr-4 mb-4 scroll-smooth editor-container"
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
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`h-4 w-4 rounded-full opacity-80 border hover:bg-gray-800 hover:border-gray-800 ${
                  focused ? "border-gray-200 bg-gray-200" : "border-gray-200"
                }`}
                onClick={() => setNoteOptionsOpen(true)}
              />
            </div>
          </div>
          <Editor
            id={note.id}
            doc={note.doc}
            onChange={handleOnChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            ref={remirrorContextRef}
          />
        </motion.div>
      </AnimatePresence>

      {remirrorContextRef.current && (
        <RemirrorContext.Provider value={remirrorContextRef.current}>
          <NoteOptionsModal
            isOpen={noteOptionsOpen}
            note={note}
            onRequestClose={() => {
              setNoteOptionsOpen(false);
            }}
          >
            <ExportOption
              note={note}
              onRequestClose={() => {
                setNoteOptionsOpen(false);
              }}
            />
          </NoteOptionsModal>
        </RemirrorContext.Provider>
      )}
    </>
  );
};

export default EditorContainer;
