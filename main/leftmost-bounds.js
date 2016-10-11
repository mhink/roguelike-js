import { screen } from 'electron';

export default () => {
  let leftmostDisplay;

  for(let display of screen.getAllDisplays()) {
    if(!leftmostDisplay || display.bounds.x < leftmostDisplay.bounds.x) {
      leftmostDisplay = display;
    }
  }

  return {
    x: leftmostDisplay.bounds.x + 50,
    y: leftmostDisplay.bounds.y + 50
  };
};
