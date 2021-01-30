import { Action, ActionCreator, AnyAction, Dispatch } from "redux";
import {
  fetchDevices as GatewayFetchDevices,
  fetchHueApiEndpoint as GatewayFetchHueApiEndpoint,
  registerApp as GatewayRegisterApp,
  RegisterAppError,
  RegisterAppSuccess,
} from "../../HueGateway";
import { Device } from "../../Contract";
import { fold, Option } from "fp-ts/Option";

export type HueAction = AnyAction | FetchDevicesAction;

export type UpdateIPAction = UpdateIPStart | UpdateIPFinished | UpdateIPFailed;

export type RegisterAction =
  | RegisterAppStart
  | RegisterAppFinished
  | RegisterAppFailed;

export type FetchDevicesAction =
  | FetchDevicesStart
  | FetchDevicesFinished
  | FetchDevicesFailed;

export const UPDATE_IP_START = "UPDATE_IP_START";
export const UPDATE_IP_FINISHED = "UPDATE_IP_FINISHED";
export const UPDATE_IP_FAILED = "UPDATE_IP_FAILED";
export const FETCH_DEVICES_START = "FETCH_DEVICES_START";
export const FETCH_DEVICES_FINISHED = "FETCH_DEVICES_FINISHED";
export const FETCH_DEVICES_FAILED = "FETCH_DEVICES_FAILED";
export const REGISTER_APP_START = "REGISTER_APP_START";
export const REGISTER_APP_FINISHED = "REGISTER_APP_FINISHED";
export const REGISTER_APP_FAILED = "REGISTER_APP_FAILED";

export interface UpdateIPStart extends Action {
  type: "UPDATE_IP_START";
}

export interface UpdateIPFinished extends Action {
  type: "UPDATE_IP_FINISHED";
  value: string;
}

export interface UpdateIPFailed extends Action {
  type: "UPDATE_IP_FAILED";
}

export interface FetchDevicesStart extends Action {
  type: "FETCH_DEVICES_START";
}

export interface FetchDevicesFinished extends Action {
  type: "FETCH_DEVICES_FINISHED";
  devices: Device[];
}

export interface FetchDevicesFailed extends Action {
  type: "FETCH_DEVICES_FAILED";
  error: Error;
}

export interface RegisterAppStart extends Action {
  type: "REGISTER_APP_START";
}

export interface RegisterAppFinished extends Action {
  type: "REGISTER_APP_FINISHED";
  userName: string;
}

export interface RegisterAppFailed extends Action {
  type: "REGISTER_APP_FAILED";
  description: string;
}

const updateIPStart: ActionCreator<UpdateIPStart> = () => ({
  type: UPDATE_IP_START,
});

const updateIPFinished: ActionCreator<UpdateIPFinished> = (ip: string) => ({
  type: UPDATE_IP_FINISHED,
  value: ip,
});

const updateIPFailed: ActionCreator<UpdateIPFailed> = () => ({
  type: UPDATE_IP_FAILED,
});

export const updateIP = () => {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(updateIPStart());
    GatewayFetchHueApiEndpoint()
      .then((r) =>
        fold<string, UpdateIPAction>(
          () => dispatch(updateIPFailed()),
          (x) => dispatch(updateIPFinished(x))
        )(r)
      )
      .catch(() => dispatch(updateIPFailed()));
  };
};

const fetchDevicesStart: ActionCreator<FetchDevicesStart> = () => ({
  type: FETCH_DEVICES_START,
});

const fetchDevicesFinished: ActionCreator<FetchDevicesFinished> = (
  devices: Device[]
) => ({
  type: FETCH_DEVICES_FINISHED,
  devices: devices,
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

const registerAppStart: ActionCreator<RegisterAppStart> = () => ({
  type: REGISTER_APP_START,
});

const registerAppFinished: ActionCreator<RegisterAppFinished> = (
  userName: string
) => ({
  type: REGISTER_APP_FINISHED,
  userName: userName,
});

const registerAppFailed: ActionCreator<RegisterAppFailed> = (
  description: string
) => ({
  type: REGISTER_APP_FAILED,
  description: description,
});

export const registerApp = (endpoint: string) => {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(registerAppStart());
    GatewayRegisterApp(endpoint)
      .then((r: Option<RegisterAppSuccess | RegisterAppError>) => {
        fold<RegisterAppSuccess | RegisterAppError, RegisterAction>(
          () => dispatch(registerAppFailed("users are empty")),
          (x) => {
            const s = x as RegisterAppSuccess;
            if (s.success !== undefined) {
              return dispatch(registerAppFinished(s.success.username));
            }
            const e = x as RegisterAppError;
            if (e.error !== undefined) {
              return dispatch(registerAppFailed(e.error.description));
            }

            return dispatch(
              registerAppFailed(`Failed to parse response. ${x}`)
            );
          }
        )(r);
      })
      .catch((e: Error) => dispatch(registerAppFailed(e.message)));
  };
};
