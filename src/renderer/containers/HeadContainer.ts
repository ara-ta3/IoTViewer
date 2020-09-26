import { connect } from "react-redux";
import { Action, Dispatch } from "redux";

import { RootState } from "../reducers";
import { Head } from "../components/Head";

const mapStateToProps = (state: RootState) => ({
  headline: state.text.value,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Head);
