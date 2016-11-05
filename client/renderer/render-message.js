import { getMessage } from "features/rendering";

export default (context2d, state) => {
  const message = getMessage(state);
  if (message) {
    context2d.save();
    context2d.fillStyle = "white";
    context2d.font = "16px monospace";
    context2d.fillText(message, 6, 12);
    context2d.restore();
  }
};
