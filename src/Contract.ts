import * as ElectronStore from "electron-store";
import { string } from "fp-ts";

export interface Device {
  id: number;
  state: DeviceState;
  type: string;
  name: string;
  productName: string;
}

export interface Group {
  name: string;
  class: string;
  lights: number[];
}

export interface DeviceState {
  on: boolean;
  bri: number;
}

interface StoreType {
  hueName: string;
  hueIP: string;
}
export const electronStore = new ElectronStore<StoreType>({
  cwd: __dirname,
});
