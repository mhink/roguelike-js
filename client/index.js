import React from "react";
import { render } from "react-dom";
import configureStore from "configure-store";
import { Provider } from "react-redux";
import App from "./app";
import inputSaga from "features/input/sagas";

window.tileMap = require("res/test.map");

require("siimple");
require("./layout.css");

const [store, sagaMiddleware] = configureStore();

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  window.canvas = canvas;
});

document.addEventListener('keydown', (keyboardEvent) => {
  sagaMiddleware.run(inputSaga, keyboardEvent);
});

store.subscribe(() => {
  const canvas = window.canvas;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const tileset = store.getState().tilesets;

  if(!render) {
    return;
  }

  const map = window.tileMap;

  for(let y = 0; y < window.tileMap.length; y++) {
    for(let x = 0; x < map[y].length; x++) {
      const tile = map[y][x];
      const tileInfo  = tileset.tiles[tile];
      const imgInfo   = tileset.images[tileInfo.image];

      const { x: cx, y: cy } = tileInfo.coords;
      const { x: tx, y: ty } = imgInfo.tileSize;

      const img = imgInfo.img;
      const sx = cx * tx;
      const sy = cy * ty;
      const sWidth  = tx;
      const sHeight = ty;

      const dx      = 4 * x * tx;
      const dy      = 4 * y * ty;
      const dWidth  = 4 * tx;
      const dHeight = 4 * ty;

      ctx.drawImage(
        img, 
        sx, sy, 
        sWidth, sHeight, 
        dx, dy, 
        dWidth, dHeight
      )
    }
  }
});

window.$$store = store;
