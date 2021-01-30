import { AnyAction, combineReducers, Reducer } from "redux";
import {
  FETCH_DEVICES_FINISHED,
  HueAction,
  REGISTER_APP_FAILED,
  REGISTER_APP_FINISHED,
  UPDATE_IP_FINISHED,
} from "../actions/HueAction";
import { Device } from "../../Contract";

export interface HueUserState {
  readonly name: string | null;
  readonly ip: string | null;
  readonly devices: Device[] | null;
  readonly userNameDescription: string | null;
}

const defaultState: HueUserState = {
  name: localStorage.getItem("hutName") ?? null,
  ip: null,
  devices: null,
  userNameDescription: null,
};

export const textReducer: Reducer<HueUserState> = (
  state = defaultState,
  action: AnyAction
) => {
  switch (action.type) {
    case UPDATE_IP_FINISHED:
      return {
        ...state,
        ip: action.value,
      };
    case FETCH_DEVICES_FINISHED:
      return {
        ...state,
        devices: action.devices,
      };

    case REGISTER_APP_FINISHED:
      return {
        ...state,
        name: action.userName,
      };
    case REGISTER_APP_FAILED:
      return {
        ...state,
        userNameDescription: action.description,
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
