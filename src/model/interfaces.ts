import Fuse from "fuse.js";

export const ItemTypes = {
  CARD: "card",
  COLLECTION: "collection",
};

export interface ICanvasCard {
  type: string;
  id: string;
  // The x,y co-ords of the element
  x: number;
  y: number;
}

export interface ICanvas {
  id: string;
  title: string;
  items: ICanvasCard[];
}

export interface INote {
  id: string;
  title: string;
  createdTime: number;
  lastEditedTime: number;
  meta: object;
  doc: any;
  text: string;
}

// JSON serialised prosemirror state returned by state.toJSON()
export interface PMState {
  doc: any;
  selection: object;
}

export interface SearchResult {
  item: INote;
  matches: Fuse.FuseResultMatch[];
}

export interface IPeer {
  id: string;
  name?: string;
}

export interface Tag {
  id: string;
  name: string;
}
