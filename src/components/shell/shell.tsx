import { FunctionComponent } from "react";
import NavigationButtons from "@/components/navigation-buttons/navigation-buttons";
import { Outlet } from "react-router-dom";
import MenuButton from "@/components/menu-button/menu-button";
import SideNav from "@/components/side-nav/side-nav";
import SearchModal from "@/components/search-modal/search-modal";

interface AppShellProps {}

const AppShell: FunctionComponent<AppShellProps> = (props) => {
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
