import { FC, useContext } from "react";
import Modal from "react-modal";
import SearchBar from "@/components/searchbar/searchbar";
import { NotesContext } from "@/components/NotesContext";

const SearchModal: FC = () => {
  Modal.setAppElement("#root");

  const { setSearchOpen, searchOpen } = useContext(NotesContext);
  return (
    <Modal
      isOpen={searchOpen}
      onRequestClose={() => setSearchOpen(false)}
      overlayClassName="fixed inset-0 bg-[rgba(30,30,30,.5)]"
      className="z-20 bg-gray-100 backdrop-blur-lg rounded-t-xl absolute w-full top-1/4 left-0 right-0 mx-auto max-w-2xl "
    >
      <SearchBar />
    </Modal>
  );
};

export default SearchModal;
