import { useContext, useCallback, useEffect, useState } from "react";
import { getNotes, onChange } from "@/db/pouch/notes";
import { INote } from "@/model/interfaces";
import { useNavigate } from "react-router-dom";
import AddNoteFAB from "@/components/add-note-fab/add-note-fab";
import { VscKebabVertical } from "react-icons/vsc";
import NoteOptionsModal from "@/components/note-options-modal/note-options-modal";
import "./library.css";
import { NotesContext } from "@/components/NotesContext";
import { paths } from "@/router/Routes";

export default function Library() {
  const [allNotes, setAllNotes] = useState<INote[]>([]);
  const [noteOptionsOpen, setNoteOptionsOpen] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<INote>();

  const navigate = useNavigate();
  const { items, addItem } = useContext(NotesContext);

  const fetchAllNotes = useCallback(async () => {
    const response = (await getNotes()) as unknown as INote[];
    if (response) setAllNotes(response);
  }, [setAllNotes]);

  const openNoteOptions = (note: INote) => {
    setSelectedNote(note);
    setNoteOptionsOpen(true);
  };

  useEffect(() => {
    fetchAllNotes();
    onChange(fetchAllNotes);

    return () => {
      setAllNotes([]);
    };
  }, [fetchAllNotes]);

  return (
    <>
      <div className="p-5 md:px-14 lg:px-36">
        <table className="rounded-lg divide-y divide-gray-200 note-list shadow-md">
          <thead>
            <tr>
              <th className="w-11/12 lg:w-9/12">Note</th>
              <th className="hidden lg:block w-2/12">Edited</th>
              <th className="w-1/12"></th>
            </tr>
          </thead>
          <tbody>
            {allNotes
              .sort((a, b) => (a.lastEditedTime < b.lastEditedTime ? 1 : -1)) // Sort by last edited date descending
              .map((note, idx) => {
                return (
                  <tr key={idx} id={`row-${note.id}`}>
                    <td>
                      <button
                        className="truncate w-full transition duration-250 ease-in-out bg-gradient-to-r hover:from-gray-100 hover:to-gray-200"
                        onClick={() => {
                          addItem(note.id);
                          navigate(`${paths.panelWorkspace}#${note.id}`);
                        }}
                      >
                        <div className="flex flex-col text-left">
                          <div className="font-medium flex space-x-1">
                            <span>{note.title || "No Title"}</span>
                            <span
                              className={`rounded-full h-2 w-2 bg-green-500 ${
                                items.find((el) => el == note.id)
                                  ? "inline"
                                  : "hidden"
                              } `}
                            ></span>
                          </div>
                          <span className="text-sm text-gray-500 font-light">
                            {note.text || "empty"}
                          </span>
                        </div>
                      </button>
                    </td>
                    <td className="hidden lg:block">
                      {new Date(note.lastEditedTime).toLocaleString(
                        navigator.language,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </td>
                    <td>
                      <button onClick={() => openNoteOptions(note)}>
                        <VscKebabVertical />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <AddNoteFAB
          handleClick={(id) => navigate(`${paths.panelWorkspace}#${id}`)}
        />
      </div>

      <NoteOptionsModal
        isOpen={noteOptionsOpen}
        note={selectedNote}
        onRequestClose={() => {
          setSelectedNote(null);
          setNoteOptionsOpen(false);
        }}
      />
    </>
  );
}
