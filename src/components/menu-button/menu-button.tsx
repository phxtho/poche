import { FunctionComponent, useContext } from "react";
import { FiMenu } from "react-icons/fi";
import { NotesContext } from "@/components/NotesContext";

interface MenuButtonProps {}

const MenuButton: FunctionComponent<MenuButtonProps> = () => {
  const { toggleNav } = useContext(NotesContext);
  return (
    <button onClick={toggleNav}>
      <FiMenu />
    </button>
  );
};

export default MenuButton;
