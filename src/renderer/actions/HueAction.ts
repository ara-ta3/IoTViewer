import { Action, ActionCreator, AnyAction } from "redux";

export const UPDATE_NAME = "UPDATE_NAME";

export interface UpdateNameAction extends Action {
  type: "UPDATE_NAME";
  value: string;
}

export const updateName: ActionCreator<HueAction> = (name: string) => ({
  type: UPDATE_NAME,
  value: name,
});

export type HueAction = UpdateNameAction | AnyAction;
