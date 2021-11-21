import { AnyAction, combineReducers, Reducer } from "redux";
import {
  FETCH_DEVICES_FINISHED,
  FETCH_GROUPS_FINISHED,
  HueAction,
  REGISTER_APP_FAILED,
  REGISTER_APP_FINISHED,
  REGISTER_APP_START,
  UPDATE_IP_FINISHED,
} from "../actions/HueAction";
import { Device, Group } from "../../Contract";

export interface HueUserState {
  readonly name: string | null;
  readonly ip: string | null;
  readonly devices: Device[] | null;
  readonly groups: Group[] | null;
  readonly userNameDescription: string | null;
}

const defaultState: HueUserState = {
  name: localStorage.getItem("hueName") ?? null,
  ip: null,
  devices: null,
  groups: null,
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
    case FETCH_GROUPS_FINISHED:
      return {
        ...state,
        groups: action.groups,
      };

    case REGISTER_APP_START:
      return {
        ...state,
        userNameDescription: "",
      };
    case REGISTER_APP_FINISHED:
      localStorage.setItem("hueName", action.userName);
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
