import configureStore from "store";
import CanvasRenderer from "canvas-renderer";

require("siimple");
require("./layout.css");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const context2d = canvas.getContext("2d");
  context2d.imageSmoothingEnabled = false;

  const store = configureStore({}, context2d);
  window.$$store = store;
  window.$$renderer = new CanvasRenderer(store, context2d);
});
