import { useState, useMemo } from "react";
import Router from "@/router/Routes";
import "./App.css";
import NoteContext, {
  addArrayItem,
  removeArrayItem,
} from "@/components/NotesContext";

function App() {
  const [noteContext, setNoteContext] = useState({
    items: [],
    addItem: (items, item) => {
      if (!items.find((x) => x === item)) {
        setNoteContext({
          ...noteContext,
          items: addArrayItem(items, item),
        });
      }
    },
    removeItem: (items, item) => {
      setNoteContext({
        ...noteContext,
        items: removeArrayItem(items, item),
      });
    },
  });

  const contextValue = useMemo(() => noteContext, [noteContext]);

  return (
    <div className="App">
      <NoteContext.Provider value={contextValue}>
        <Router />
      </NoteContext.Provider>
    </div>
  );
}

export default App;
