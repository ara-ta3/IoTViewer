import { connect } from "react-redux";

import { RootState } from "../reducers";
import { Head } from "../components/Head";
import { fetchDevices, updateIP } from "../actions/HueAction";

const mapStateToProps = (state: RootState) => ({
  name: state.hue.name ?? "",
  ip: state.hue.ip ?? "",
  devices: state.hue.devices,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchIP: () => dispatch(updateIP()),
  fetchDevices: (ip: string, name: string) => dispatch(fetchDevices(ip, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Head);
