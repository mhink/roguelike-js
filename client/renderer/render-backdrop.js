import { getScreenSizePx } from "features/rendering";

export default (context2d, state) => {
  const { x: sx, x: sy } = getScreenSizePx(state);
  context2d.save();
  context2d.fillStyle = "black";
  context2d.fillRect(0, 0, sx, sy);
  context2d.restore();
};
