import { FunctionComponent } from "react";
import BackButton from "@/components/back-button/back-button";
import SearchBar from "@/components/searchbar/searchbar";

interface AppShellProps {}

const AppShell: FunctionComponent<AppShellProps> = (props) => {
  return (
    <div className="min-h-screen max-w-full">
      <div className="w-full flex justify-between items-center mb-2 p-2">
        <BackButton />
        <div className="hidden md:inline-block">
          <SearchBar />
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default AppShell;
