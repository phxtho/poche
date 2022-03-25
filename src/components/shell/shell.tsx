import { FunctionComponent } from "react";
import BackButton from "@/components/back-button/back-button";
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
          <BackButton />
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
