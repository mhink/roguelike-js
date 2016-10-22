const tilenames = [
  ['human'],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  ['dwarf', 'dwarf_armour','dwarf_goldarmour','dwarf_miner','dwarf_prospector','dwarf_priest','dwarf_wizard','dwarf_engineer'],
  ['orc','orc_armour','orc_twosword','orc_brawler','orc_saber','orc_cleric','orc_shaman','orc_cyclops'],
  ['goblin','armour_goblin'],
  ['lizard','lizard_wizard','lizard_knight','lizard_monk','lizard_archer','lizard_prince','lizard_???','lizard_dragon'],
];

const tiledefs = [];
for (let y = 0; y < tilenames.length; y++) {
  for (let x = 0; x < tilenames[y].length; x++) {
    tiledefs.push([
      tilenames[y][x],
      x,
      y
    ]);
  }
}

export default tiledefs;
