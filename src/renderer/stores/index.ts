import { createStore, Store } from "redux";
import { rootReducer, RootState } from "../reducers";

const configureStore = (
  initialState?: RootState
): Store<RootState | undefined> => {
  return createStore(rootReducer, initialState);
};

const store = configureStore();

export default store;
