/* eslint-disable no-mixed-operators */

export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function indexToPos(tileIndex, boardsize) {
  return [
    Math.floor(tileIndex / boardsize),
    Math.floor(tileIndex % boardsize),
  ];
}

export function posToIndex(pos, boardsize) {
  const [x, y] = pos;
  return x * boardsize + y;
}

export function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}