import { createContext, FunctionComponent, useCallback, useState } from "react";

interface INoteContext {
  items: string[];
  addItem(item: string): any;
  removeItem(item: string): any;
  navOpen: boolean;
  toggleNav(): any;
  searchOpen: boolean;
  setSearchOpen(isOpen: boolean): any;
  activeNote: string | undefined;
  setActiveNote: (noteId: string) => any;
}

export let initalState: INoteContext = {
  items: [],
  addItem: () => {},
  removeItem: () => {},
  navOpen: false,
  toggleNav: () => {},
  searchOpen: false,
  setSearchOpen: () => {},
  activeNote: undefined,
  setActiveNote: (noteId: string) => {},
};

export const removeArrayItem = (array: any[], item: any): any[] =>
  array.filter((x) => x !== item);

export const addArrayItem = (array: any[], item: any): any[] =>
  !array.find((x) => x === item) ? [...array, item] : array;

const NotesContext = createContext(initalState);
NotesContext.displayName = "NotesContext";
export { NotesContext };

const NoteContextProvider: FunctionComponent = ({ children }) => {
  const [ctx, setCtx] = useState<INoteContext>(initalState);

  const addItem = useCallback(
    (item) => {
      const { items } = ctx;
      if (!items.find((x) => x === item)) {
        setCtx({
          ...ctx,
          items: addArrayItem(items, item),
        });
      }
    },
    [ctx]
  );

  const removeItem = useCallback(
    (item) => {
      const { items } = ctx;
      setCtx({
        ...ctx,
        items: removeArrayItem(items, item),
      });
    },
    [ctx]
  );

  const toggleNav = useCallback(() => {
    setCtx({ ...ctx, navOpen: !ctx.navOpen });
  }, [ctx]);

  const setSearchOpen = useCallback(
    (isOpen: boolean) => {
      setCtx({ ...ctx, searchOpen: isOpen });
    },
    [ctx]
  );

  const setActiveNote = useCallback(
    (noteId: string) => {
      setCtx({ ...ctx, activeNote: noteId });
    },
    [ctx]
  );

  return (
    <div className="App">
      <NotesContext.Provider
        value={{
          ...ctx,
          addItem,
          removeItem,
          toggleNav,
          setSearchOpen,
          setActiveNote,
        }}
      >
        {children}
      </NotesContext.Provider>
    </div>
  );
};

export default NoteContextProvider;
