import { FC, useContext } from "react";
import { NotesContext } from "@/components/NotesContext";
import MenuItem from "@/components/menu-item/menu-item";
import { FiHome, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { paths } from "@/router/Routes";
import { motion, AnimatePresence } from "framer-motion";

interface SideNavProps {}

const SideNav: FC = () => {
  const navigate = useNavigate();
  const { navOpen, setSearchOpen, searchOpen } = useContext(NotesContext);
  return (
    <AnimatePresence>
      {navOpen && (
        <motion.div
          initial={{ scale: 0, left: -50 }}
          animate={{ scale: 1, left: 0 }}
          exit={{ scale: 0, left: -50 }}
          className={`h-fit bg-gray-200 backdrop-blur-lg rounded-r-xl shadow-lg flex flex-col space-y-2 items-center py-5 px-1  shrink-0 fixed bottom-0 top-0 left-0 my-auto 
      lg:w-32`}
        >
          <MenuItem onClick={() => navigate(paths.home)}>
            <FiHome /> <span className="hidden lg:block">Home</span>
          </MenuItem>
          <MenuItem onClick={() => setSearchOpen(!searchOpen)}>
            <FiSearch /> <span className="hidden lg:block">Search</span>
          </MenuItem>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SideNav;
