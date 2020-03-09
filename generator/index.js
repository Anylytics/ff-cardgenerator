/*
Card Data Model
productLine: String (Air Travel, Hotels, Dining, Local Excursions, Local Entertainment, Ground Transport)
value: Integer
schematic: Array<9>
*/

var CardDefault = {
    productLine: "Air Travel",
    featureLabel: "Online Booking",
    productId: 0,
    value: 2,
    schematic: [0,0,-1,0,0,-1,-1,-1,-1]
};

var cardSvg;


d3.xml("../card.svg").then(initSvg);

function initSvg(svgData) {
    cardSvg = svgData.documentElement;
    attachCard(CardDefault);
}


function attachCard(feature) {
    var idVal = "Card_" + new Date().getTime();

    cardSvg.id = idVal;
    cardSvg.style.margin = "10px";

    document.body.append(cardSvg);

    var schematic = feature.schematic;
    
    schematic.forEach(function(featureEl, idx) {
        var thisColor = colorMap[featureEl] || "#ffffff";
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
    d3.select("#" + idVal).select("#featureLabel").select("tspan").text(feature.featureLabel);
    d3.select("#" + idVal).select("#industry").style("fill", colorMap[feature.productId]).style("fill-opacity", 0.75);
}