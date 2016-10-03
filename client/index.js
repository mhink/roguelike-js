import React from "react";
import { render } from "react-dom";
import configureStore from "store";
import { Provider } from "react-redux";
import App from "./app";

window.tileMap = require("res/test.map");

require("siimple");
require("./layout.css");

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  window.$$store = configureStore({}, canvas);
});
