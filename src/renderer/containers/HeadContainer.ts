import { connect } from "react-redux";

import { RootState } from "../reducers";
import { Head } from "../components/Head";
import { fetchDevices, registerApp, updateIP } from "../actions/HueAction";

const mapStateToProps = (state: RootState) => ({
  name: state.hue.name ?? "",
  ip: state.hue.ip ?? "",
  devices: state.hue.devices,
  userNameDescription: state.hue.userNameDescription ?? "",
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchIP: () => dispatch(updateIP()),
  registerApp: (ip: string) => dispatch(registerApp(ip)),
  fetchDevices: (ip: string, name: string) => dispatch(fetchDevices(ip, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Head);
