import { AnyAction, combineReducers, Reducer } from "redux";
import {
  FETCH_DEVICES_FINISHED,
  HueAction,
  UPDATE_IP,
  UPDATE_NAME,
} from "../actions/HueAction";
import { DevicesResponse } from "../../HueGateway";

export interface HueUserState {
  readonly name: string | null;
  readonly ip: string | null;
  readonly devices: DevicesResponse | null;
}

const defaultState: HueUserState = {
  name: null,
  ip: null,
  devices: null,
};

export const textReducer: Reducer<HueUserState> = (
  state = defaultState,
  action: AnyAction
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
    case FETCH_DEVICES_FINISHED:
      return {
        ...state,
        devices: action.payload,
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
