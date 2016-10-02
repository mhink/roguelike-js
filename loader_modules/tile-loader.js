const map = require('lodash').map;
const MAPPING_REGEX = /^(.)=(\w+)$/;

module.exports = function(source) {
  this.cacheable();

  const lines = source.split("\n");
  const tileMappings = {};
  const tileSet = [];
  let i = 0;

  for(/*i*/; i < lines.length; i++) {
    const line = lines[i];
    if(/---/.test(line)) {
      i++;
      break;
    }

    const matches = MAPPING_REGEX.exec(line);

    if(matches) {
      const character = matches[1];
      const tileName = matches[2];
      tileMappings[character] = tileName;
    }
  }

  for(/*i*/; i < lines.length; i++) {
    const chars = lines[i].split('');
    if(chars.length > 0) {
      const tiles = map(chars, c => tileMappings[c]);
      tileSet.push(tiles);
    }
  }

  return JSON.stringify(tileSet);
};
