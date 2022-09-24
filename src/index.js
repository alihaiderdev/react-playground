import "antd/dist/antd.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { ShoppingCartProvider } from "./context/CartContext";
import "./index.css";
import store from "./store/index";

ReactDOM.render(
  <Provider store={store}>
    <ShoppingCartProvider>
      <App />
    </ShoppingCartProvider>
  </Provider>,
  document.getElementById("root")
);
