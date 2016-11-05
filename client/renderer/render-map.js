import { backgroundTiles } from "features/rendering";
import drawTile from './draw-tile';

export default (context2d, state) => {
  for (const { tileName, ...dPos } of backgroundTiles(state)) {
    drawTile(context2d, state, tileName, dPos);
  }
};
