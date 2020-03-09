var colorMap = {
    0: "#8c7ae6",
    1: "#44bd32",
    2: "#40739e",
    3: "#c23616",
    4: "#0097e6"
};

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

var counter = 0;

var client = new XMLHttpRequest();
client.open('GET', '/data.txt');
client.onload = function() {
  processData(client.responseText);
}
client.send();


function processData(d) {
    var features = d.split("\n");
    features.forEach(renderCard);
}

function renderCard(feature) {
    // load the external svg from a file
    d3.xml("card.svg").then(function(data) {
        var idVal = "Card" + counter;
        counter++;


        data.documentElement.id = idVal;
        data.documentElement.style.margin = "10px";


        var thisCard = d3.select("#"+idVal);

        document.body.append(data.documentElement);

        var value = 0;
        feature.split(",").forEach(function(featureEl, idx) {

            value += parseInt(featureEl)>=0 ? 1 : 0;
            var thisColor = colorMap[featureEl] || "#ffffff";
            var thisId = "#" + idMap[idx];
            d3.select("#" + idVal).select(thisId)
                .style('stroke', thisColor)
                .style('fill', thisColor)
                .style('fill-opacity', 0.25);
        });


        d3.select("#" + idVal).select("#val").select("tspan").text(value);
        d3.select("#" + idVal).select("#industry").style("fill", colorMap[Math.floor(Math.random()*5)]);

    });
}