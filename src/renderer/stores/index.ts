import { applyMiddleware, createStore, Store } from "redux";
import { rootReducer, RootState } from "../reducers";
import thunkMiddleware from "redux-thunk";

const configureStore = (
  initialState?: RootState
): Store<RootState | undefined> => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware)
  );
};

const store = configureStore();

export default store;
