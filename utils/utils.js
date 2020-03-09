var colorMap = {
    0: "#c23616",
    1: "#44bd32",
    2: "#0097e6",
    3: "#fa983a",
    4: "#8c7ae6"
};

function rotateColor(current_color) {
    for (var c in colorMap) {
        if (colorMap[c]===current_color) {
            return colorMap[genNextIndex(c)] || "#fff";
        }
    }
    return colorMap[0];

    function genNextIndex(idx) {
        idx++;
        if (idx>4) return -1;
        return idx;
    }
}

var idMap = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
};