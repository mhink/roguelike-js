import React from "react";
import { render } from "react-dom";
import configureStore from "configure-store";
import { Provider } from "react-redux";
import App from "./app";

require("siimple");
require("./layout.css");

const store = configureStore();

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  document.body.appendChild(canvas);
});

document.addEventListener('keydown', () => {
  store.dispatch({
    type: "SAY_HELLO"
  });
});
