import {
  getOffset,
  getMessage,
  shouldRender,
} from "features/rendering/reducer";

import { 
  getPlayerPosition,
  getPositions
} from "features/maps/reducer";

import {
  getTileParams,
  getTileForEntity,
} from "features/tilesets/reducer";

export default class CanvasRenderer {
  constructor(store, context2d) {
    this._context2d = context2d;
    this._store = store;
    this._unsubscribe = store.subscribe(() => this.handleUpdate());
  }

  handleUpdate() {
    const state = this._store.getState();
    if(shouldRender(state)) {
      this.render(state);
    }
  }

  render(state) {
    const { sx, sy } = this._getDimensions();
    const positions = getPositions(state);
    const { x: dx, y: dy } = getOffset(state);

    this._context2d.fillRect(0,0,sx,sy);

    for(let x = 1; x < 8; x++) {
      for(let y = 1; y < 8; y++) {
        try {
          const coords = getTileParams(state, x - dx, y - dy, 'grass');
          this._context2d.drawImage(...coords);
        } catch (err) {
          console.error(`Couldn't draw image- error: ${err}`);
        }
      }
    }
    for(let [uuid, { x, y }] of positions) {
      try {
        const { tileName } = getTileForEntity(state, uuid);
        const coords = getTileParams(state, x - dx, y - dy, tileName);
        this._context2d.drawImage(...coords);
      } catch (err) {
        console.error(`Couldn't draw image- error: ${err}`);
      }
    }
    const message = getMessage(state);
    if(message) {
      const prevFill = this._context2d.fillStyle;
      this._context2d.fillStyle = "white";
      this._context2d.font = "16px monospace";
      this._context2d.fillText(message, 6, 12);
      this._context2d.fillStyle = prevFill;
    }
  }

  _getDimensions() {
    return {
      sx: this._context2d.canvas.clientWidth,
      sy: this._context2d.canvas.clientHeight
    };
  }
};
