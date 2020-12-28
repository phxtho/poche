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
