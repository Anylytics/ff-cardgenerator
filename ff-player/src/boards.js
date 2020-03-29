import { indexToPos, posToIndex } from './utils';

//Board1 = First Image from Goutham (with bouncer walls) (RED)
export let board1 = {
    tokens: [19, 27, 41, 53],
    walls: {
        4: ["right"],
        5: ["left"],
        19: ["right", "bottom"],
        20: ["left"],
        26: ["right"],
        27: ["left", "top"],
        33: ["bottom"],
        39: ["bottom"],
        41: ["right", "top"],
        42: ["left"],
        47: ["top"],
        48: ["bottom"],
        52: ["right"],
        53: ["left", "bottom"],
        56: ["top", "right"],
        57: ["left"],
        61: ["top"],
    }
};

//Board2 = Second Image from Goutham, with Bouncer Walls (YELLOW)
export let board2 = {
    tokens: [10, 20, 28, 40, 53],
    walls: {
        0: ["right"],
        1: ["left"],
        9: ["right"],
        10: ["left", "bottom"],
        18: ["top"],
        20: ["right", "bottom"],
        21: ["left"],
        27: ["right"],
        28: ["left", "top"],
        39: ["bottom"],
        40: ["left", "bottom"],
        45: ["bottom"],
        47: ["top"],
        48: ["top", "bottom"],
        53: ["top", "right"],
        54: ["left"],
        56: ["top", "right"],
        57: ["left"],
    }
};

//Board3 = Third Image from Goutham, with Bouncer Walls (BLUE)
export let board3 = {
    tokens: [10, 32, 45, 53],
    walls: {
        0: ["right"],
        1: ["left"],
        2: ["bottom"],
        9: ["right"],
        10: ["left", "top"],
        23: ["bottom"],
        31: ["top"],
        32: ["right", "bottom"],
        33: ["left"],
        40: ["top"],
        44: ["right"],
        45: ["left", "bottom"],
        48: ["bottom"],
        53: ["right", "top"],
        54: ["left"],
        56: ["top", "right"],
        57: ["left"],
    }
};

//Board4 = Fourth Image from Goutham, no bouncer walls (Green)
export let board4 = {
    tokens: [13, 25, 50, 54],
    walls: {
        1: ["right"],
        2: ["left"],
        5: ["bottom"],
        13: ["top", "right"],
        14: ["left"],
        17: ["bottom"],
        24: ["right"],
        25: ["left", "top"],
        39: ["bottom"],
        47: ["top"],
        50: ["right", "bottom"],
        48: ["bottom"],
        51: ["left"],
        53: ["right"],
        54: ["left", "bottom"],
        56: ["top", "right"],
        57: ["left"],
        58: ["top"],
        62: ["top"],
    }
};

function rotateClockwise(board) {
    //rotate once clockwise
    let outputBoard = {tokens: [], walls: {}};
    for (let element in board.walls) {
        let [row, column] = indexToPos(element, 8);
        let idx = posToIndex([column, 7 - row], 8);

        //console.log(element+" "+row+" "+column);
        //console.log(element+" "+column+" "+(7-row));
        outputBoard.walls[idx] = board.walls[element].map(rotateElement);
        //console.log(outputBoard[idx]);
    }
    for (let token of board.tokens) {
        let [row, column] = indexToPos(token, 8);
        let idx = posToIndex([column, 7 - row], 8);
        outputBoard.tokens.push(idx);
    }
    return outputBoard;
}

function rotateElement(element) {
    if (element == 'top') {
        return 'right';
    }
    else if (element == 'right') {
        return 'bottom';
    }
    else if (element == 'bottom') {
        return 'left';
    }
    else if (element == 'left') {
        return 'top';
    }

}

export function transposeBoard(inputBoard, position = [0, 1]) {
    let outputBoard = {tokens: [], walls: {}};
    let shift = (position[0] * 8 * 16) + (position[1] * 8);
    let rotation = 0;
    switch (2 * position[0] + position[1]) {
        case 0:
            rotation = 3;
            break;
        case 1:
            rotation = 0;
            break;
        case 2:
            rotation = 2;
            break;
        case 3:
            rotation = 1;
            break;
    }
    for (const x of Array(rotation).keys()) {
        inputBoard = rotateClockwise(inputBoard);
    }
    for (let element in inputBoard.walls) {
        let row = Math.floor(element / 8);
        let remainder = element % 8;
        outputBoard.walls[row * 16 + remainder + shift] = inputBoard.walls[element];
    }
    for (let element of inputBoard.tokens) { 
        let row = Math.floor(element / 8);
        let remainder = element % 8;
        outputBoard.tokens.push( (row * 16) + remainder + shift)
    }
    return outputBoard;
}

