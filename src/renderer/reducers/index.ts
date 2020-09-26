import { Action, combineReducers, Reducer } from "redux";

export interface TextState {
  readonly value: string;
}

const defaultState: TextState = {
  value: "Hello World",
};

export const textReducer: Reducer<TextState> = (
  state = defaultState,
  action: Action
) => {
  return state;
};

export interface RootState {
  text: TextState;
}

export const rootReducer = combineReducers<RootState>({
  text: textReducer,
});
