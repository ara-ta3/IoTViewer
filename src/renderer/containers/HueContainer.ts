import { connect } from "react-redux";

import { RootState } from "../reducers";
import { HueDevices } from "../components/Hue";

const mapStateToProps = (state: RootState) => ({
  devices: state.hue.devices ?? [],
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HueDevices);
