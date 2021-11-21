import { connect } from "react-redux";

import { RootState } from "../reducers";
import { Head } from "../components/Head";
import { fetchIp, registerApp } from "../actions/HueAction";

const mapStateToProps = (state: RootState) => ({
  name: state.hue.name ?? "",
  ip: state.hue.ip ?? "",
  devices: state.hue.devices,
  userNameDescription: state.hue.userNameDescription ?? "",
});

const mapDispatchToProps = (dispatch: any) => ({
  registerApp: () => dispatch(registerApp()),
  fetchIp: () => dispatch(fetchIp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Head);
