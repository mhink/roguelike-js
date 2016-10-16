const floortiles = [
  ["-nw", "-n", "-ne", "-wne",  null, "-news"],
  [ "-w",  "",  "-e",  "-we", "-swn", "-ns", "-sen"],
  ["-sw", "-s", "-se", "-wse"]
];

const floorsets = [
  ['blank'],

  ['brick-dawn',  'grass-dawn',   'rock-dawn'],
  ['brick-day',   'grass-day',    'rock-day'],
  ['brick-dusk',  'grass-dusk',   'rock-dusk'],
  ['brick-night', 'grass-night',  'rock-night'],

  ['dirt-dawn',  'wood-dawn',   'snow-dawn'],
  ['dirt-day',   'wood-day',    'snow-day'],
  ['dirt-dusk',  'wood-dusk',   'snow-dusk'],
  ['dirt-night', 'wood-night',  'snow-night'],

  ['log-dawn'],
  ['log-day'],
  ['log-dusk'],
  ['log-night']
];

const FLOORSET_WIDTH  = 7;
const FLOORSET_HEIGHT = 3;

const tilesForFloorset = (prefix, X, Y) => {
  const tiles = [];

  for(let y = 0; y < floortiles.length; y++) {
    for(let x = 0; x < floortiles[y].length; x++) {
      const suffix = floortiles[y][x];
      if(suffix !== null) {
        tiles.push([
          `${prefix}${suffix}`,
          (X * FLOORSET_WIDTH) + x,
          (Y * FLOORSET_HEIGHT) + y,
        ]);
      }
    }
  }
  return tiles;
}

const tiledefs = [];

for(let Y = 0; Y < floorsets.length; Y++) {
  for(let X = 0; X < floorsets[Y].length; X++) {
    const prefix = floorsets[Y][X];
    const tiles = tilesForFloorset(prefix, X, Y)
    tiledefs.push(...tiles);
  }
}

export default tiledefs;
