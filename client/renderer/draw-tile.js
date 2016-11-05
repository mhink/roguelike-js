import {
  getTileSizePx,
  getScreenSizePx,
} from "features/rendering";

import {
  getTileParams,
} from "features/tilesets";

export default (context2d, state, tileName, dPos) => {
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
