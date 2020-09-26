import { combineReducers, Reducer } from "redux";
import { HueAction, UPDATE_IP, UPDATE_NAME } from "../actions/HueAction";

export interface HueUserState {
  readonly name: string | null;
  readonly ip: string | null;
}

const defaultState: HueUserState = {
  name: null,
  ip: null,
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
    case UPDATE_IP:
      return {
        ...state,
        ip: action.value,
      };
    default:
      return state;
  }
};

export interface RootState {
  hue: HueUserState;
}

export const rootReducer: Reducer<RootState, HueAction> = combineReducers<
  RootState,
  HueAction
>({
  hue: textReducer,
});
