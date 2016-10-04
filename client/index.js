import configureStore from "store";

window.tileMap = require("res/test.map");

require("siimple");
require("./layout.css");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  window.$$store = configureStore({}, canvas);
});
