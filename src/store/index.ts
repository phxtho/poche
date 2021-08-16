import { createStore, compose } from "redux";
import { ICanvas } from "model/interfaces";
import update from "immutability-helper";

export const ADD_ITEM_TO_CANVAS = "ADD_ITEM_TO_CANVAS";
export const REMOVE_ITEM_FROM_CANVAS = "REMOVE_ITEM_FROM_CANVAS";
export const UPDATE_ITEM = "UPDATE_ITEM_POSITION";

const openCanvas: ICanvas = {
  id: "randomID",
  title: "Main Canvas",
  items: [],
};

const reducer = function (
  state = { openCanvas: openCanvas },
  { type, payload }
) {
  switch (type) {
    case ADD_ITEM_TO_CANVAS:
      const { items } = state.openCanvas;
      if (!items.find((item) => item.id === payload?.id)) {
        state.openCanvas.items = update(items, { $push: [payload] });
        return state;
      }
      return state;
    case REMOVE_ITEM_FROM_CANVAS:
      state.openCanvas.items = state.openCanvas.items.filter(
        (item) => item.id !== payload?.id
      );
      return state;
    case UPDATE_ITEM:
      const oldItem = state.openCanvas.items.find(
        (item) => item.id === payload?.id
      );

      if (!oldItem) {
        return state;
      }

      const itemIdx = state.openCanvas.items.indexOf(oldItem);
      state.openCanvas.items = update(state.openCanvas.items, {
        [itemIdx]: { $merge: { ...payload } },
      });

      return state;

    default:
      return state;
  }
};

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ || compose;
let store = createStore(reducer, composeEnhancers());

export default store;
