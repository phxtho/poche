import { FunctionComponent, useContext } from "react";
import { FiMenu } from "react-icons/fi";
import { NotesContext } from "@/components/NotesContext";

interface MenuButtonProps {}

const MenuButton: FunctionComponent<MenuButtonProps> = () => {
  const { toggleNav } = useContext(NotesContext);
  return (
    <button
      className="rounded-full h-8 w-8 bg-white opacity-80 hover:bg-gray-800 hover:text-white  flex justify-center items-center"
      onClick={toggleNav}
    >
      <FiMenu />
    </button>
  );
};

export default MenuButton;
