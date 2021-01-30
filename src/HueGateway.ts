import fetch from "node-fetch";
import { Device } from "./Contract";
import { fromNullable, map, Option } from "fp-ts/Option";

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
    return res.json();
  }
}

interface DiscoveryMeethueResponseValue {
  id: string;
  internalipaddress: string;
}

export async function fetchHueApiEndpoint(): Promise<Option<string>> {
  const res = await fetch("https://discovery.meethue.com/");
  const json: DiscoveryMeethueResponseValue[] = await res.json();
  return map((x: DiscoveryMeethueResponseValue) => x.internalipaddress)(
    fromNullable(json.pop())
  );
}

interface DevicesResponse {
  [key: number]: Omit<Omit<Device, "id">, "productName"> & {
    productname: string;
  };
}

function responseToDevices(res: DevicesResponse): Device[] {
  return Object.keys(res).map((key) => {
    const id = parseInt(key);
    const partial = res[id];
    return {
      ...partial,
      id: id,
      productName: partial.productname,
    };
  });
}

export async function fetchDevices(
  apiEndpoint: string,
  userName: string
): Promise<Device[]> {
  const g = new HueGateway(apiEndpoint, userName);
  const res = await g.fetchDevices();
  console.log(res);
  return responseToDevices(res);
}
