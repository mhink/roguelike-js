import { getVectorAtPoint } from "features/vecfield";
import { getOffset } from "features/rendering";

export default (context2d, state, tx, ty) => {
  const { theta, r } = getVectorAtPoint(state, tx, ty);

  if(r < 0.01) return;

  const { x: tsx, y: tsy } = state.rendering.tileSizePx;
  const [px, py] = [tx * tsx, ty * tsy];

  const { x: dx, y: dy } = getOffset(state);

  context2d.save();
  context2d.translate(px - (dx*tsx) + (tsx / 2), py - (dy*tsy) + (tsy  / 2));
  context2d.rotate(theta);

  const red = Math.round(255 - ((r / 100) * 255));
  context2d.globalAlpha = 0.5;
  context2d.fillStyle = `rgb(${r},0,0)`;

  context2d.moveTo(-(r/2) * 5, 0);
  context2d.lineTo( (r/2) * 5, 0);
  context2d.restore();
};

const renderVectorField = (context2d, state) => {
  if(!state.vecfield.field) return;

  context2d.save();
  context2d.strokeStyle = "white";
  context2d.beginPath();
  const { x: sx, y: sy } = state.rendering.screenSize;
  for (let y = 0; y < sx; y++) {
    for (let x = 0; x < sy; x++) {
      renderVectorFieldAtTile(context2d, state, x, y);
    }
  }
  context2d.stroke();
  context2d.restore();
};

