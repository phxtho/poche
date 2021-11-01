import React from "react";

export let defaultContextValue = {
  items: [],
  addItem: (items, item) => {
    // const { items } = defaultContextValue;
    defaultContextValue.items = addArrayItem(items, item);
  },
  removeItem: (items, item) => {
    // const { items } = defaultContextValue;
    defaultContextValue.items = removeArrayItem(items, item);
  },
};

export const removeArrayItem = (array: any[], item: any): any[] =>
  array.filter((x) => x !== item);

export const addArrayItem = (array: any[], item: any): any[] =>
  !array.find((x) => x === item) ? [...array, item] : array;

const NotesContext = React.createContext(defaultContextValue);
NotesContext.displayName = "NotesContext";
export default NotesContext;
