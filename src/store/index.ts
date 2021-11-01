import { createStore, compose } from "redux";
import { ICanvas } from "model/interfaces";
import update from "immutability-helper";

export const ADD_ITEM_TO_CANVAS = "ADD_ITEM_TO_CANVAS";
export const REMOVE_ITEM_FROM_CANVAS = "REMOVE_ITEM_FROM_CANVAS";
export const UPDATE_ITEM = "UPDATE_ITEM_POSITION";

const reducer = function (state = { cards: [] }, { type, payload }) {
  switch (type) {
    case ADD_ITEM_TO_CANVAS:
      const { cards } = state;
      if (!cards.find((item) => item.id === payload?.id)) {
        state.cards = update(cards, { $push: [payload] });
        return state;
      }
      return state;
    case REMOVE_ITEM_FROM_CANVAS:
      state.cards = state.cards.filter((item) => item.id !== payload?.id);
      return state;
    case UPDATE_ITEM:
      const oldItem = state.cards.find((item) => item.id === payload?.id);

      if (!oldItem) {
        return state;
      }

      const itemIdx = state.cards.indexOf(oldItem);
      state.cards = update(state.cards, {
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
