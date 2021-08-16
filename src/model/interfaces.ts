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
  state: PMState;
}

// JSON serialised prosemirror state returned by state.toJSON()
export interface PMState {
  doc: object;
  selection: object;
}
