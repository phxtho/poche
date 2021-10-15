import React from "react";
import { INote } from "model/interfaces";
import { deleteNote } from "db/pouch/notes";
import { FiDownload, FiTrash, FiTool } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { REMOVE_ITEM_FROM_CANVAS } from "store";
import Modal, { Styles } from "react-modal";

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
  },
};

const NoteOptionsModal = (props: NoteOptionsModalProps) => {
  Modal.setAppElement("#root");

  const dispatch = useDispatch();

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
            onClick={() => props.onRequestClose()}
          >
            <FiTool className="mx-auto" /> Properties
          </button>

          <button
            className="w-full h-16 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-200"
            onClick={() => props.onRequestClose()}
          >
            <FiDownload className="mx-auto" /> Download
          </button>

          <button
            className="w-full h-16 rounded-lg shadow-md bg-red-500 text-white hover:shadow-lg hover:bg-red-600"
            onClick={() => {
              dispatch({
                type: REMOVE_ITEM_FROM_CANVAS,
                payload: { id: props.note.id },
              });
              deleteNote(props.note);
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
