import { useContext } from "react";
import { VscAdd } from "react-icons/vsc";
import { insertNote } from "@/db/pouch/notes";
import { NotesContext } from "@/components/NotesContext";

export default function AddNoteFAB(props) {
  const { addItem } = useContext(NotesContext);

  const createCard = async () => {
    let newNote = await insertNote();
    addItem(newNote.id);
    return newNote.id;
  };

  return (
    <button
      onClick={async () => {
        const id = await createCard();
        props?.handleClick?.(id);
      }}
      className="bg-gray-200 opacity-80 text-black backdrop-blur-xl rounded-full h-16 w-16 fixed right-8 bottom-8 flex justify-center items-center shadow-md hover:pointer hover:opacity-100 hover:bg-green-500 hover:text-white"
    >
      <VscAdd />
    </button>
  );
}
