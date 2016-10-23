/* eslint-disable no-magic-numbers */

import {
  getOffset,
  getMessage,
  shouldRender,
  backgroundTiles
} from "features/rendering";

import {
  getPositions
} from "features/maps";

import {
  getTileParams,
  getTileForEntity
} from "features/tilesets";

const drawTile = (context2d, state, tileName, dPos, screenTileSize) => {
  try {
    const { x: dtx, y: dty } = dPos;
    const { x: dWidth, y: dHeight } = screenTileSize;
    const { img, sx, sy, sWidth, sHeight } = getTileParams(state, tileName);
    const [dx, dy] = [dtx * dWidth, dty * dHeight];

    context2d.drawImage(
      img,
      sx, sy,
      sWidth, sHeight,
      dx, dy,
      dWidth, dHeight
    );
  } catch (err) {
    console.error(`Couldn't draw tile- error: ${err}`);
  }
};

const renderBackdrop = (context2d, dimensions) => {
  const { sx, sy } = dimensions;
  context2d.fillRect(0, 0, sx, sy);
};

const renderBackground = (context2d, state, screenTileSize) => {
  for (const { tileName, ...dPos } of backgroundTiles(state)) {
    drawTile(context2d, state, tileName, dPos, screenTileSize);
  }
};

const renderEntities = (context2d, state, screenTileSize) => {
  const positions = getPositions(state);
  const { x: dx, y: dy } = getOffset(state);

  for (const [uuid, { x: x0, y: y0 }] of positions) {
    const { name: tileName } = getTileForEntity(state, uuid);
    const dPos = { x: x0 - dx, y: y0 - dy };
    drawTile(context2d, state, tileName, dPos, screenTileSize);
  }
};

const renderMessage = (context2d, state) => {
  const message = getMessage(state);
  if (message) {
    context2d.save();
    context2d.fillStyle = "white";
    context2d.font = "16px monospace";
    context2d.fillText(message, 6, 12);
    context2d.restore();
  }
};

export default class CanvasRenderer {
  constructor(store, context2d, tileDimensions) {
    this._context2d = context2d;
    this._store = store;
    this._unsubscribe = store.subscribe(() => this.handleUpdate());
    this._tileDimensions = tileDimensions;
  }

  handleUpdate() {
    const state = this._store.getState();
    if (shouldRender(state)) {
      this.render(state);
    }
  }

  render(state) {
    renderBackdrop(this._context2d, this._getDimensions());
    renderBackground(this._context2d, state, this._tileDimensions);
    renderEntities(this._context2d, state, this._tileDimensions);
    renderMessage(this._context2d, state);
  }

  _getDimensions() {
    return {
      sx: this._context2d.canvas.clientWidth,
      sy: this._context2d.canvas.clientHeight
    };
  }
}
