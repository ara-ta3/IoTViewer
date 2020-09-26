import { Action, ActionCreator, AnyAction } from "redux";

export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_IP = "UPDATE_IP";

export interface UpdateNameAction extends Action {
  type: "UPDATE_NAME";
  value: string;
}

export interface UpdateIPAction extends Action {
  type: "UPDATE_IP";
  value: string;
}

export const updateName: ActionCreator<UpdateNameAction> = (name: string) => ({
  type: UPDATE_NAME,
  value: name,
});

export const updateIP: ActionCreator<UpdateIPAction> = (ip: string) => ({
  type: UPDATE_IP,
  value: ip,
});

export type HueAction = UpdateNameAction | UpdateIPAction | AnyAction;
