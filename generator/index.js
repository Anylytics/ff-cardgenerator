/*
Card Data Model
productLine: String (Air Travel, Hotels, Dining, Local Excursions, Local Entertainment, Ground Transport)
value: Integer
schematic: Array<9>
*/

var CardDefault = {
    productLine: "Product Line/Industry",
    featureLabel: "Printing Press",
    productId: 0,
    value: 5,
    schematic: [-1,-1,-1,-1,-1,-1,-1,-1,-1]
};

function CardGenerator(name, schematic) {

}

var cardSvg;
var cardRenderZone = document.getElementById("featureContainer");
var activeCard;
var savedCards = [];

d3.xml("../card.svg").then(initSvg);

function initSvg(svgData) {
    cardSvg = svgData.documentElement;
    attachCard(CardDefault);
}

function resetCard() {
    if (!activeCard) return;
    var reset = []
    CardDefault.schematic.forEach(function(val,idx) {
        var thisColor = "#ecf0f1";
        var thisId = "#" + idMap[idx];
        d3.select("#" + activeCard).select(thisId)
            .style('stroke', thisColor)
            .style('fill', thisColor)
            .style('fill-opacity', 0.25)
            .attr('col', thisColor);
    });
}

function writeOutput(input) {
    var el = document.getElementById("outputData");
    var original = el.value;
    el.value = (original||"") + "\n" + input;
}

function saveCard() {
    var schematic = [];
    CardDefault.schematic.forEach(function(val,idx) {        var thisColor = "#ecf0f1";
        var thisId = "#" + idMap[idx];
        var colorId = colorToId(d3.select("#" + activeCard).select(thisId).attr("col"));
        schematic.push(colorId===undefined ? -1 : parseInt(colorId));
    })
    writeOutput(schematic);
}

function attachCard(feature) {
    var idVal = "Card_" + new Date().getTime();
    activeCard = idVal;

    cardSvg.id = idVal;
    cardSvg.style.margin = "10px";

    cardRenderZone.append(cardSvg);

    var schematic = feature.schematic;
    
    schematic.forEach(function(featureEl, idx) {
        var thisColor = colorMap[featureEl] || "#ecf0f1";
        var thisId = "#" + idMap[idx];
        d3.select("#" + idVal).select(thisId)
            .style('stroke', thisColor)
            .style('fill', thisColor)
            .style('fill-opacity', 0.25)
            .attr('col', thisColor);
        d3.select("#" + idVal).select(thisId).on("click", function() {
            var lastColor = d3.select(this).attr('col');
            var nextColor = rotateColor(lastColor);
            d3.select(this).style('fill', nextColor)
                            .style('stroke', nextColor)
                            .attr('col', nextColor);
        })
    });

    d3.select("#" + idVal).select("#val").select("tspan").text(feature.value);
    d3.select("#" + idVal).select("#productLine").select("tspan").text(feature.productLine);
    d3.select("#" + idVal).select("#featureLabel").select("textPath").text(feature.featureLabel);
    
    var thisIndustryColor = colorMap[feature.productId]
    d3.select("#" + idVal).select("#industry")
        .style("fill", thisIndustryColor)
        .style("fill-opacity", 0.75)
        .attr('col', thisIndustryColor)
        .on("click", function() {
            
            var lastColor = d3.select(this).attr('col');
            var nextColor = rotateColor(lastColor);
            d3.select(this).style('fill', nextColor)
                            .attr('col', nextColor);
        });
    
}