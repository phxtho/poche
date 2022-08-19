import { useContext } from "react";
import { NotesContext } from "@/components/NotesContext";

const useCloseActiveNote = () => {
  const { removeItem, activeNote } = useContext(NotesContext);
  const closeNote = () => {
    removeItem(activeNote);
  };

  return closeNote;
};

export default useCloseActiveNote;
