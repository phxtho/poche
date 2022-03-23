import { useContext, FunctionComponent } from "react";
import { INote } from "@/model/interfaces";
import { deleteNote } from "@/db/pouch/notes";
import { FiTrash, FiX } from "react-icons/fi";
import Modal, { Styles } from "react-modal";
import NotesContext from "@/components/NotesContext";
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
      overlayClassName="rounded-lg max-w-xl mx-auto"
    >
      <div>
        <h1 className="text-center mb-2">actions</h1>
        <div className="flex flex-col space-y-4">
          {props.children}
          <MenuItem
            onClick={() => {
              removeItem(items, noteId);
              props.onRequestClose();
            }}
          >
            <span>Close</span> <FiX />
          </MenuItem>

          <MenuItem
            onClick={() => {
              removeItem(items, noteId);
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
