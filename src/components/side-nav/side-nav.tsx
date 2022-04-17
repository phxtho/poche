import { FunctionComponent, useContext } from "react";
import { NotesContext } from "@/components/NotesContext";
import MenuItem from "../menu-item/menu-item";
import { FiHome, FiSearch, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { paths } from "@/router/Routes";

interface SideNavProps {}

const SideNav: FunctionComponent<SideNavProps> = () => {
  const navigate = useNavigate();
  const { navOpen } = useContext(NotesContext);
  return (
    <div
      className={`h-fit bg-gray-200 backdrop-blur-lg rounded-r-xl shadow-lg flex flex-col space-y-2 items-center py-5 px-1  shrink-0 fixed bottom-0 top-0 left-0 my-auto 
      lg:w-32
      ${navOpen ? "block" : "hidden"}`}
    >
      <MenuItem onClick={() => navigate(paths.home)}>
        <FiHome /> <span className="hidden lg:block">Home</span>
      </MenuItem>
      <MenuItem>
        <FiSearch /> <span className="hidden lg:block">Search</span>
      </MenuItem>
      <MenuItem onClick={() => navigate(paths.settings)}>
        <FiSettings /> <span className="hidden lg:block">Settings</span>
      </MenuItem>
    </div>
  );
};

export default SideNav;
