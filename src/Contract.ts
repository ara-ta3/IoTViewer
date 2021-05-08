import * as ElectronStore from "electron-store";

export interface Device {
  id: number;
  state: DeviceState;
  type: string;
  name: string;
  productName: string;
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
