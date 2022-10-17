import { FC, useContext } from "react";
import { FiMenu } from "react-icons/fi";
import { NotesContext } from "@/components/NotesContext";
import { motion } from "framer-motion";

const MenuButton: FC = () => {
  const { toggleNav } = useContext(NotesContext);
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="rounded-full h-8 w-8 bg-white opacity-80 hover:bg-gray-800 hover:text-white  flex justify-center items-center"
      onClick={toggleNav}
    >
      <FiMenu />
    </motion.button>
  );
};

export default MenuButton;
