import React from "react";
import { render } from "react-dom";
import configureStore from "configure-store";
import { Provider } from "react-redux";
import App from "./app";

require("siimple");
require("./layout.css");

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
