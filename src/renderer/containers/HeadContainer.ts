import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";

import { RootState } from "../reducers";
import { Head } from "../components/Head";
import {
  fetchDevices,
  HueAction,
  updateIP,
  updateName,
} from "../actions/HueAction";

const mapStateToProps = (state: RootState) => ({
  name: state.hue.name ?? "",
  ip: state.hue.ip ?? "",
  devices: state.hue.devices,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateName: (name: string) => dispatch(updateName(name)),
  updateIP: (ip: string) => dispatch(updateIP(ip)),
  fetchDevices: (ip: string, name: string) => dispatch(fetchDevices(ip, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Head);
