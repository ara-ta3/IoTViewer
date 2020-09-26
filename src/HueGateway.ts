import fetch from "node-fetch";
import { Device } from "./Contract";

class HueGateway {
  readonly apiEndpoint: string;
  readonly userName: string;
  constructor(apiEndpoint: string, userName: string) {
    this.apiEndpoint = apiEndpoint;
    this.userName = userName;
  }

  async fetchDevices(): Promise<DevicesResponse> {
    const url = `${this.apiEndpoint}/api/${this.userName}/lights`;
    const res = await fetch(url);
    const body: DevicesResponse = await res.json();
    return body;
  }
}

interface DevicesResponse {
  [key: number]: Omit<Device, "id">;
}

function responseToDevices(res: DevicesResponse): Device[] {
  return Object.keys(res).map((key) => {
    const id = parseInt(key);
    const partial = res[id];
    return {
      ...partial,
      id: id,
    };
  });
}

export async function fetchDevices(
  apiEndpoint: string,
  userName: string
): Promise<Device[]> {
  const g = new HueGateway(apiEndpoint, userName);
  const res = await g.fetchDevices();
  return responseToDevices(res);
}
