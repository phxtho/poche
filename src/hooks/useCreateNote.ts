import { NotesContext } from "@/components/NotesContext";
import { insertNote } from "@/db/pouch/notes";
import { paths } from "@/router/Routes";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Creates a new note and redirects to the note.
 */
const useCreateNote = (): (() => Promise<void>) => {
  const navigate = useNavigate();
  const { addItem } = useContext(NotesContext);
  const createNote = async () => {
    try {
      const note = await insertNote();
      addItem(note.id);
      navigate(`${paths.panelWorkspace}#${note.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return createNote;
};

export default useCreateNote;
