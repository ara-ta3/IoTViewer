import { Action, ActionCreator, AnyAction, Dispatch } from "redux";
import {
  DevicesResponse,
  fetchDevices as GatewayFetchDevices,
} from "../../HueGateway";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../reducers";

export type HueAction =
  | AnyAction
  | UpdateNameAction
  | UpdateIPAction
  | FetchDevicesAction;

export type FetchDevicesAction =
  | FetchDevicesStart
  | FetchDevicesFinished
  | FetchDevicesFailed;

export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_IP = "UPDATE_IP";
export const FETCH_DEVICES_START = "FETCH_DEVICES_START";
export const FETCH_DEVICES_FINISHED = "FETCH_DEVICES_FINISHED";
export const FETCH_DEVICES_FAILED = "FETCH_DEVICES_FAILED";

export interface UpdateNameAction extends Action {
  type: "UPDATE_NAME";
  value: string;
}

export interface UpdateIPAction extends Action {
  type: "UPDATE_IP";
  value: string;
}

export interface FetchDevicesStart extends Action {
  type: "FETCH_DEVICES_START";
}

export interface FetchDevicesFinished extends Action {
  type: "FETCH_DEVICES_FINISHED";
  payload: DevicesResponse;
}

export interface FetchDevicesFailed extends Action {
  type: "FETCH_DEVICES_FAILED";
  error: Error;
}

export const updateName: ActionCreator<UpdateNameAction> = (name: string) => ({
  type: UPDATE_NAME,
  value: name,
});

export const updateIP: ActionCreator<UpdateIPAction> = (ip: string) => ({
  type: UPDATE_IP,
  value: ip,
});

const fetchDevicesStart: ActionCreator<FetchDevicesStart> = () => ({
  type: FETCH_DEVICES_START,
});

const fetchDevicesFinished: ActionCreator<FetchDevicesFinished> = (
  payload: DevicesResponse
) => ({
  type: FETCH_DEVICES_FINISHED,
  payload: payload,
});

const fetchDevicesFailed: ActionCreator<FetchDevicesFailed> = (
  error: Error
) => ({
  type: FETCH_DEVICES_FAILED,
  error: error,
});

export const fetchDevices = (endpoint: string, name: string) => {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(fetchDevicesStart());
    GatewayFetchDevices(endpoint, name)
      .then((r) => dispatch(fetchDevicesFinished(r)))
      .catch((e: Error) => dispatch(fetchDevicesFailed(e)));
  };
};
