import { connect } from "react-redux";

import { RootState } from "../reducers";
import { HueDevices } from "../components/Hue";
import { fetchDevices, fetchGroups, updateLight } from "../actions/HueAction";
import { UpdateHueStateRequest } from "../../HueGateway";

const mapStateToProps = (state: RootState) => ({
  ip: state.hue.ip || "",
  userName: state.hue.name || "",
  devices: state.hue.devices,
  groups: state.hue.groups,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateDevice: (
    endpoint: string,
    userName: string,
    deviceId: number,
    req: UpdateHueStateRequest
  ) => dispatch(updateLight(endpoint, userName, deviceId, req)),
  fetchDevices: (name: string) => dispatch(fetchDevices(name)),
  fetchGroups: (name: string) => dispatch(fetchGroups(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HueDevices);
