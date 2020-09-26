import { combineReducers, Reducer } from "redux";
import { HueAction, UPDATE_NAME } from "../actions/HueAction";

export interface HueUserState {
  readonly name: string | null;
}

const defaultState: HueUserState = {
  name: null,
};

export const textReducer: Reducer<HueUserState> = (
  state = defaultState,
  action: HueAction
) => {
  switch (action.type) {
    case UPDATE_NAME:
      return {
        ...state,
        name: action.value,
      };
    default:
      return state;
  }
};

export interface RootState {
  text: HueUserState;
}

export const rootReducer: Reducer<RootState, HueAction> = combineReducers<
  RootState,
  HueAction
>({
  text: textReducer,
});
