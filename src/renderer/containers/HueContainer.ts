import { connect } from "react-redux";

import { RootState } from "../reducers";
import { HueDevices } from "../components/Hue";
import { updateLight } from "../actions/HueAction";

const mapStateToProps = (state: RootState) => ({
  ip: state.hue.ip || "",
  userName: state.hue.name || "",
  devices: state.hue.devices ?? [],
});

const mapDispatchToProps = (dispatch: any) => ({
  updateDevice: (
    endpoint: string,
    userName: string,
    deviceId: number,
    on: boolean
  ) => dispatch(updateLight(endpoint, userName, deviceId, on)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HueDevices);
