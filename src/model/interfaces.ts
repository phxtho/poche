export const ItemTypes = {
  CARD: "card",
};

export interface CanvasCard {
  type: string;
  id: string;
  // The x,y co-ords of the element
  x: number;
  y: number;
}

export interface Canvas {
  id: string;
  title: string;
  items: CanvasCard[];
}

export interface Note {
  id: string;
  title: string;
  createdTime: number;
  lastEditedTime: number;
  meta: object;
  body: object;
}
