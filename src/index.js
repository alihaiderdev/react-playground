import "antd/dist/antd.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { AuthAndCartProvider } from "./context";
import "./index.css";
import store from "./store/index";

ReactDOM.render(
  <Provider store={store}>
    <AuthAndCartProvider>
      <App />
    </AuthAndCartProvider>
  </Provider>,
  document.getElementById("root")
);
