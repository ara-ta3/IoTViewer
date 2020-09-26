import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "../reducers";
import { Head } from "../components/Head";
import { HueAction, updateName } from "../actions/HueAction";

const mapStateToProps = (state: RootState) => ({
  name: state.text.name ?? "",
});

const mapDispatchToProps = (dispatch: Dispatch<HueAction>) => ({
  updateName: (name: string) => dispatch(updateName(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Head);
