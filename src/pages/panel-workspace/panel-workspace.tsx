import { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import EditorContainer from "@/components/editor-container/editor-container";
import AddNoteFAB from "@/components/add-note-fab/add-note-fab";
import { ReactFrameworkOutput, RemirrorContext } from "@remirror/react-core";
import Toolbar from "@/components/remirror-editor/toolbar";
import { NotesContext } from "@/components/NotesContext";
import "./panel-workspace.css";
import { getNoteById } from "@/db/pouch/notes";
import { VscFolderOpened } from "react-icons/vsc";

export default function PanelWorkspace() {
  const { items, addItem, setActiveNote } = useContext(NotesContext);

  const [focusedEditorContext, setEditorContext] =
    useState<ReactFrameworkOutput<any>>();

  const location = useLocation();

  useEffect(() => {
    // Open note specified in url hash
    if (location.hash) {
      const noteId = location.hash.substring(1); //remove leading #
      if (noteId && !items.includes(noteId)) {
        getNoteById(noteId).then((note) => {
          if (note) addItem(noteId);
        });
      }
    }
  }, [location.hash]);

  return (
    <>
      {items.length > 0 && (
        <div className="editor-list">
          {items.map((item) => (
            <EditorContainer
              key={item}
              id={item}
              handleFocus={(editorCtx) => {
                setEditorContext(editorCtx);
                setActiveNote(item);
              }}
            />
          ))}
        </div>
      )}
      {items.length === 0 && (
        <div className="absolute mx-auto top-1/2 w-full text-center text-gray-300">
          <VscFolderOpened className="h-10 w-10 mx-auto" />
          <h1>Workspace Empty</h1>
        </div>
      )}

      {focusedEditorContext && (
        <RemirrorContext.Provider value={focusedEditorContext}>
          <Toolbar />
        </RemirrorContext.Provider>
      )}
      <AddNoteFAB />
    </>
  );
}
