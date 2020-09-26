import fetch from "node-fetch";

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

export interface DevicesResponse {
  [key: string]: {
    state: {
      on: boolean;
    };
    type: string;
    name: string;
  };
}

export async function fetchDevices(
  apiEndpoint: string,
  userName: string
): Promise<DevicesResponse> {
  const g = new HueGateway(apiEndpoint, userName);
  return g.fetchDevices();
}
