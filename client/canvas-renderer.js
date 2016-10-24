/* eslint-disable no-magic-numbers */

import {
  getOffset,
  getMessage,
  shouldRender,
  backgroundTiles,
  getTileSizePx,
  getScreenSizePx,
} from "features/rendering";

import {
  getPositions
} from "features/maps";

import {
  getTileParams,
  getTileForEntity
} from "features/tilesets";

const drawTile = (context2d, state, tileName, dPos) => {
  try {
    const { x: dtx, y: dty } = dPos;
    const { x: dWidth, y: dHeight } = getTileSizePx(state);
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

const renderBackdrop = (context2d, state) => {
  const { x: sx, x: sy } = getScreenSizePx(state);
  context2d.fillRect(0, 0, sx, sy);
};

const renderBackground = (context2d, state) => {
  for (const { tileName, ...dPos } of backgroundTiles(state)) {
    drawTile(context2d, state, tileName, dPos);
  }
};

const renderEntities = (context2d, state) => {
  const positions = getPositions(state);
  const { x: dx, y: dy } = getOffset(state);

  for (const [uuid, { x: x0, y: y0 }] of positions) {
    const { name: tileName } = getTileForEntity(state, uuid);
    const dPos = { x: x0 - dx, y: y0 - dy };
    drawTile(context2d, state, tileName, dPos);
  }
};

const renderBrainOverlay = (context2d, state) => {
  const brainToShow = state.rendering.showBrain;
  if (!brainToShow) return;
  const { x: dx, y: dy } = getOffset(state);
  const dispositions = state.disposition.registry[brainToShow];
  if (!dispositions) return;
  const attractors = dispositions.attraction || [[]];

  context2d.save();
  for (let y = 0; y < attractors.length; y++) {
    for (let x = 0; x < attractors[y].length; x++) {
      const { x: dWidth, y: dHeight } = getTileSizePx(state);
      const attraction = attractors[y][x];
      const [dx0, dy0] = [(x-dx) * dWidth, (y-dy) * dHeight];

      const r = Math.round(255 - ((attraction / 100) * 255));
      const g = 0;
      const b = Math.round((attraction / 10) * 255);
      context2d.globalAlpha = 0.25;
      context2d.fillStyle = `rgb(${r},${g},${b})`;
      context2d.fillRect(
        dx0, dy0,
        dWidth, dHeight
      );

      context2d.globalAlpha = 1;
      context2d.fillStyle = "white";
      context2d.font = "8px monospace";
      context2d.fillText(attraction, dx0, dy0+8);
    }
  }
  context2d.restore();
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
  }

  handleUpdate() {
    const state = this._store.getState();
    if (shouldRender(state)) {
      this.render(state);
    }
  }

  render(state) {
    renderBackdrop(this._context2d, state);
    renderBackground(this._context2d, state);
    renderEntities(this._context2d, state);
    renderMessage(this._context2d, state);
    renderBrainOverlay(this._context2d, state);
  }
}
