

export  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export  function indexToPos(tileIndex, boardsize) {
    return [
        Math.floor(tileIndex / boardsize),
        Math.floor(tileIndex % boardsize)
    ];
}

export  function posToIndex(pos, boardsize) {
    let [x, y] = pos;
    return x * boardsize + y;
}