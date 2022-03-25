import { FunctionComponent, useContext } from "react";
import { NotesContext } from "@/components/NotesContext";

interface SideNavProps {}

const SideNav: FunctionComponent<SideNavProps> = () => {
  const { navOpen } = useContext(NotesContext);
  return <div className={`${navOpen ? "block" : "hidden"}`}>Side Nav</div>;
};

export default SideNav;
