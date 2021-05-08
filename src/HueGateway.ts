import fetch from "node-fetch";
import { Device } from "./Contract";
import { fromNullable, map, Option } from "fp-ts/Option";

interface DiscoveryMeethueResponseValue {
  id: string;
  internalipaddress: string;
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

export async function fetchHueApiEndpoint(): Promise<Option<string>> {
  const res = await fetch("https://discovery.meethue.com/");
  const json: DiscoveryMeethueResponseValue[] = await res.json();
  return map((x: DiscoveryMeethueResponseValue) => x.internalipaddress)(
    fromNullable(json.pop())
  );
}

export interface RegisterAppError {
  error: {
    type: number;
    address: string;
    description: string;
  };
}

export interface RegisterAppSuccess {
  success: {
    username: string;
  };
}

export async function registerApp(
  apiEndpoint: string,
  deviceType: string = "HueViewer"
): Promise<Option<RegisterAppError | RegisterAppSuccess>> {
  const url = `${apiEndpoint}/api`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      devicetype: deviceType,
    }),
  });
  const json: (RegisterAppSuccess | RegisterAppError)[] = await res.json();
  return fromNullable(json.pop());
}

export async function fetchDevices(
  apiEndpoint: string,
  userName: string
): Promise<Device[]> {
  const url = `${apiEndpoint}/api/${userName}/lights`;
  const res = await fetch(url);
  const json: DevicesResponse = await res.json();
  return responseToDevices(json);
}

export async function updateDevice(
  apiEndpoint: string,
  userName: string,
  deviceId: number,
  req: UpdateHueStateRequest
): Promise<Option<UpdateDeviceSuccess | UpdateDeviceError>> {
  const url = `${apiEndpoint}/api/${userName}/lights/${deviceId}/state`;
  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({
      on: req.on,
      bri: req.bri,
    }),
  });
  const json: (UpdateDeviceSuccess | UpdateDeviceError)[] = await res.json();
  return fromNullable(json.pop());
}

export interface UpdateDeviceError {
  error: {
    type: number;
    address: string;
    description: string;
  };
}

export interface UpdateDeviceSuccess {
  success: object;
}

export interface UpdateHueStateRequest {
  on?: boolean;
  bri?: number;
}
