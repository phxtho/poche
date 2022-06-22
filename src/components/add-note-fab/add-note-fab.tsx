import { useContext } from "react";
import { insertNote } from "@/db/pouch/notes";
import { NotesContext } from "@/components/NotesContext";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AddNoteFAB(props) {
  const { addItem } = useContext(NotesContext);

  const createCard = async () => {
    let newNote = await insertNote();
    addItem(newNote.id);
    return newNote.id;
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={async () => {
        const id = await createCard();
        props?.handleClick?.(id);
      }}
      className="bg-gray-200  text-black backdrop-blur-xl rounded-full h-16 w-16 fixed right-1 bottom-12 md:right-8 md:bottom-8 flex justify-center items-center shadow-md hover:pointer hover:opacity-100 hover:bg-green-500 hover:text-white"
    >
      <FiPlus />
    </motion.button>
  );
}
