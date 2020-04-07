const colorMap = {
  0: '#c23616',
  1: '#44bd32',
  2: '#0097e6',
  3: '#fa983a',
  4: '#8c7ae6',
};
const flatWhite = '#ecf0f1';

function genNextIndex(id) {
  let idx = id;
  idx += 1;
  if (idx > 4) return -1;
  return idx;
}

function rotateColor(currentColor) {
  Object.keys(colorMap).forEach((c) => {
    if (colorMap[c] === currentColor) {
      return colorMap[genNextIndex(c)] || '#ecf0f1';
    }
    return '';
  });
  return colorMap[0];
}

function colorToId(color) {
  Object.keys(colorMap).forEach((c) => {
    if (colorMap[c] === color) {
      return c || -1;
    }
    return -1;
  });
}

const idMap = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
};

const nameMap = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
};

function getIdToName() {
  return idMap;
}
function getNameToId() {
  return nameMap;
}
function getColorMap() {
  return colorMap;
}

export default {
  rotateColor,
  getIdToName,
  colorToId,
  getNameToId,
  getColorMap,
  genNextIndex,
  flatWhite,
};
