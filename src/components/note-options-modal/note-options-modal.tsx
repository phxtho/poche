import React, { useContext } from "react";
import { INote } from "model/interfaces";
import { deleteNote } from "db/pouch/notes";
import { FiTrash, FiX } from "react-icons/fi";
import Modal, { Styles } from "react-modal";
import NotesContext from "components/NotesContext";

interface NoteOptionsModalProps {
  note?: INote;
  isOpen?: boolean;
  onAfterOpen?;
  onRequestClose?;
}

const modalStyle: Styles = {
  content: {
    borderRadius: ".5rem",
    height: "fit-content",
    maxWidth: "40rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
};

const NoteOptionsModal = (props: NoteOptionsModalProps) => {
  Modal.setAppElement("#root");

  const { items, removeItem } = useContext(NotesContext);

  return (
    <Modal
      isOpen={props.isOpen}
      onAfterClose={props.onAfterOpen}
      onRequestClose={props.onRequestClose}
      style={modalStyle}
    >
      <div>
        <h1 className="text-center mb-2">actions</h1>
        <div className="flex flex-col space-y-4">
          <button
            className="w-full h-16 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-200"
            onClick={() => {
              removeItem(items, props.note.id);
              props.onRequestClose();
            }}
          >
            <FiX className="mx-auto" /> Close
          </button>

          <button
            className="w-full h-16 rounded-lg shadow-md bg-red-500 text-white hover:shadow-lg hover:bg-red-600"
            onClick={() => {
              removeItem(items, props.note.id);
              deleteNote(props.note.id);
              props.onRequestClose();
            }}
          >
            <FiTrash className="mx-auto" /> Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NoteOptionsModal;
