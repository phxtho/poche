import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "@reach/router";
import SearchBar from "components/searchbar/searchbar";
import EditorContainer from "components/editor-container/editor-container";
import AddNoteFAB from "components/add-note-fab/add-note-fab";
import { ReactFrameworkOutput, RemirrorContext } from "@remirror/react-core";
import Toolbar from "components/remirror-editor/toolbar";
import NotesContext from "components/NotesContext";
import "./panel-workspace.css";

export default function PanelWorkspace() {
  const { items } = useContext(NotesContext);

  const [focusedEditorContext, setEditorContext] =
    useState<ReactFrameworkOutput<any>>();

  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) {
      navigate("/experiment-501.V2");
    }
  }, [items]);

  return (
    <>
      <div className="editor-list">
        {items.map((item, idx) => (
          <EditorContainer
            key={idx}
            id={item}
            handleFocus={(editorCtx) => setEditorContext(editorCtx)}
          />
        ))}
      </div>

      {focusedEditorContext && (
        <RemirrorContext.Provider value={focusedEditorContext}>
          <Toolbar />
        </RemirrorContext.Provider>
      )}
      <AddNoteFAB />
    </>
  );
}
