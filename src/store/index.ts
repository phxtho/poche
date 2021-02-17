import { createStore, compose } from "redux";
import { Canvas } from "model/interfaces";

export const ADD_ITEM_TO_CANVAS = "ADD_ITEM_TO_CANVAS";
export const REMOVE_ITEM_FROM_CANVAS = "REMOVE_ITEM_FROM_CANVAS";
export const UPDATE_ITEM = "UPDATE_ITEM_POSITION";

const openCanvas: Canvas = {
  id: "randomID",
  title: "Main Canvas",
  items: [],
};

const reducer = function (state = { openCanvas: openCanvas }, action) {
  switch (action.type) {
    case ADD_ITEM_TO_CANVAS:
      const { items } = state.openCanvas;
      if (!items.find((item) => item.id === action.payload?.id)) {
        const updatedItems = [...items, action.payload];
        const canvas = { ...state.openCanvas, items: updatedItems };
        return { ...state, openCanvas: canvas };
      }
      return state;
    case REMOVE_ITEM_FROM_CANVAS:
      state.openCanvas.items = state.openCanvas.items.filter(
        (item) => item.id !== action.payload?.id
      );
      return state;
    case UPDATE_ITEM:
      const oldItem = state.openCanvas.items.find(
        (item) => item.id === action.payload?.id
      );

      if (!oldItem) {
        return state;
      }

      const newItem = { ...oldItem, ...action.payload };
      state.openCanvas.items = state.openCanvas.items.filter(
        (item) => item.id !== action.payload?.id
      );
      state.openCanvas.items.push(newItem);
      return state;

    default:
      return state;
  }
};

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ || compose;
let store = createStore(reducer, composeEnhancers());

export default store;
