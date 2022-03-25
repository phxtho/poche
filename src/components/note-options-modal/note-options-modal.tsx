import { useContext, FunctionComponent } from "react";
import { INote } from "@/model/interfaces";
import { deleteNote } from "@/db/pouch/notes";
import { FiFile, FiTrash, FiX } from "react-icons/fi";
import Modal from "react-modal";
import { NotesContext } from "@/components/NotesContext";
import MenuItem from "@/components/menu-item/menu-item";

interface NoteOptionsModalProps {
  note?: INote;
  isOpen?: boolean;
  onAfterOpen?: any;
  onRequestClose?: any;
}

const NoteOptionsModal: FunctionComponent<NoteOptionsModalProps> = (props) => {
  Modal.setAppElement("#root");

  const { items, removeItem } = useContext(NotesContext);
  const noteId = props.note?.id;

  return (
    <Modal
      isOpen={props.isOpen ?? false}
      onAfterClose={props.onAfterOpen}
      onRequestClose={props.onRequestClose}
      overlayClassName="fixed inset-0 bg-[rgba(30,30,30,.5)]"
      className="z-20 bg-gray-100 backdrop-blur-lg rounded-t-xl absolute w-full bottom-0 left-0 right-0 p-4 mx-auto max-w-2xl "
    >
      <div>
        <div className="flex justify-between mb-6">
          <div className="flex items-center space-x-1 text-xl">
            <FiFile />
            <h2>{props.note?.title}</h2>
          </div>
          <button
            className="rounded-full h-8 w-8 bg-gray-200 opacity-80 hover:bg-gray-800 hover:text-white  flex justify-center items-center"
            onClick={props.onRequestClose}
          >
            <FiX />
          </button>
        </div>

        <div className="flex flex-col space-y-4 items-center">
          {props.children}
          {items.find((id) => id === noteId) && (
            <MenuItem
              onClick={() => {
                removeItem(noteId);
                props.onRequestClose();
              }}
            >
              <span>Close</span> <FiX />
            </MenuItem>
          )}

          <MenuItem
            onClick={() => {
              removeItem(noteId);
              deleteNote(noteId ?? "");
              props.onRequestClose();
            }}
          >
            <span>Delete</span> <FiTrash />
          </MenuItem>
        </div>
      </div>
    </Modal>
  );
};

export default NoteOptionsModal;
