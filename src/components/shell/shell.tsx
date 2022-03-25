import { FunctionComponent } from "react";
import NavigationButtons from "@/components/navigation-buttons/navigation-buttons";
import { Outlet } from "react-router-dom";
import MenuButton from "../menu-button/menu-button";
import SideNav from "../side-nav/side-nav";

interface AppShellProps {}

const AppShell: FunctionComponent<AppShellProps> = (props) => {
  return (
    <div className="min-h-screen max-w-full">
      <div className="w-full flex justify-between items-center mb-2 p-2">
        <MenuButton />
        <div>
          <NavigationButtons />
        </div>
      </div>
      <div className="flex">
        <SideNav />
        <Outlet />
      </div>
    </div>
  );
};

export default AppShell;
