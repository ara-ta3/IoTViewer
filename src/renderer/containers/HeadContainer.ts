import { connect } from "react-redux";

import { RootState } from "../reducers";
import { Head } from "../components/Head";
import { fetchDevices, updateIP, updateName } from "../actions/HueAction";

const mapStateToProps = (state: RootState) => ({
  name: state.hue.name ?? "",
  ip: state.hue.ip ?? "",
  devices: state.hue.devices,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateName: (name: string) => dispatch(updateName(name)),
  fetchIP: () => dispatch(updateIP()),
  fetchDevices: (ip: string, name: string) => dispatch(fetchDevices(ip, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Head);
