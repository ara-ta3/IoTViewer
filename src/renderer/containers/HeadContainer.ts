import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "../reducers";
import { Head } from "../components/Head";
import { HueAction, updateIP, updateName } from "../actions/HueAction";

const mapStateToProps = (state: RootState) => ({
  name: state.hue.name ?? "",
  ip: state.hue.ip ?? "",
});

const mapDispatchToProps = (dispatch: Dispatch<HueAction>) => ({
  updateName: (name: string) => dispatch(updateName(name)),
  updateIP: (ip: string) => dispatch(updateIP(ip)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Head);
