export interface Device {
  id: number;
  state: {
    on: boolean;
  };
  type: string;
  name: string;
  productName: string;
}
