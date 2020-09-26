import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { Application } from "./components/Application";
import store from "./stores";

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById("contents")
);
