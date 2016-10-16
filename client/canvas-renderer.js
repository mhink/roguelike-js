/* eslint-disable no-magic-numbers */

import {
  getOffset,
  getMessage,
  shouldRender,
  backgroundTiles,
} from "features/rendering/reducer";

import {
  getPositions,
  getCurrentMapDimensions
} from "features/maps/reducer";

import {
  getTileParams,
  getTileForEntity
} from "features/tilesets/reducer";

const renderBackdrop = (context2d, dimensions) => {
  const { sx, sy } = dimensions;
  context2d.fillRect(0, 0, sx, sy);
};

const renderBackground = (context2d, state) => {
  for (const [x, y, tile] of backgroundTiles(state)) {
    try {
      const coords = getTileParams(state, x, y, tile);
      context2d.drawImage(...coords);
    } catch (err) {
      console.error(`Couldn't draw image- error: ${err}`);
    }
  }
};

const renderEntities = (context2d, state) => {
  const positions = getPositions(state);
  const { x: dx, y: dy } = getOffset(state);

  for (const [uuid, { x, y }] of positions) {
    try {
      const { tileName } = getTileForEntity(state, uuid);
      const coords = getTileParams(state, x - dx, y - dy, tileName);
      context2d.drawImage(...coords);
    } catch (err) {
      console.error(`Couldn't draw image- error: ${err}`);
    }
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
  constructor(store, context2d) {
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
    renderBackdrop(this._context2d, this._getDimensions());
    renderBackground(this._context2d, state);
    renderEntities(this._context2d, state);
    renderMessage(this._context2d, state);
  }

  _getDimensions() {
    return {
      sx: this._context2d.canvas.clientWidth,
      sy: this._context2d.canvas.clientHeight
    };
  }
}
