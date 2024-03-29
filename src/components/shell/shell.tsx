import { FC, PropsWithChildren, useContext } from "react";
import NavigationButtons from "@/components/navigation-buttons/navigation-buttons";
import { Outlet } from "react-router-dom";
import MenuButton from "@/components/menu-button/menu-button";
import SideNav from "@/components/side-nav/side-nav";
import SearchModal from "@/components/search-modal/search-modal";
import { NotesContext } from "@/components/NotesContext";
import useKeyboardShortcut from "use-keyboard-shortcut";
import useCreateNote from "@/hooks/useCreateNote";
import useCloseActiveNote from "@/hooks/useCloseNote";

const AppShell: FC = () => {
  const { setSearchOpen, searchOpen } = useContext(NotesContext);
  const createNote = useCreateNote();
  const closeActiveNote = useCloseActiveNote();

  const defaultShortcutOptions = {
    ignoreInputFields: false,
    repeatOnHold: false,
  };

  useKeyboardShortcut(
    ["Meta", "K"],
    () => setSearchOpen(!searchOpen),
    defaultShortcutOptions
  );

  useKeyboardShortcut(["Control", "N"], () => createNote(), {
    ignoreInputFields: true,
    repeatOnHold: false,
  });

  useKeyboardShortcut(["Control", "W"], () => closeActiveNote(), {
    ignoreInputFields: true,
    repeatOnHold: false,
  });

  return (
    <div className="min-h-screen max-w-full h-full">
      <div className="w-full flex justify-between items-center mb-2 py-2 px-3">
        <MenuButton />
        <div>
          <NavigationButtons />
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <div className="w-full overflow-scroll">
          <Outlet />
        </div>
        <SideNav />
      </div>
      <SearchModal />
    </div>
  );
};

export default AppShell;
