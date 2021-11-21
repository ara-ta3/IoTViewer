import { connect } from "react-redux";

import { RootState } from "../reducers";
import { Head } from "../components/Head";
import { fetchDevices, fetchIp, registerApp } from "../actions/HueAction";

const mapStateToProps = (state: RootState) => ({
  name: state.hue.name ?? "",
  ip: state.hue.ip ?? "",
  devices: state.hue.devices,
  userNameDescription: state.hue.userNameDescription ?? "",
});

const mapDispatchToProps = (dispatch: any) => ({
  registerApp: () => dispatch(registerApp()),
  fetchIp: () => dispatch(fetchIp()),
  fetchDevices: (name: string) => dispatch(fetchDevices(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Head);
