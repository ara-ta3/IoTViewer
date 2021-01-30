import * as ElectronStore from "electron-store";

export interface Device {
  id: number;
  state: {
    on: boolean;
  };
  type: string;
  name: string;
  productName: string;
}

interface StoreType {
  hueName: string;
  hueIP: string;
}
export const electronStore = new ElectronStore<StoreType>({
  cwd: __dirname,
});
