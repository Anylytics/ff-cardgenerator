var controls = {
    featureLabel: document.getElementById("featureLabel"),
    valueRange: document.getElementById("valueRange")
};

console.log(controls);

for (var k in controls) {
    controls[k].onchange = manageChange.bind(null, k);
}


function manageChange(id, evt) {
    if (id==="featureLabel") {
        //peer.connect()
    }
}


/** Peer Tech */
var peer = new Peer(); 
var _conn;

peer.on('open', function(id){
    console.log("Peer ID is", id);
});

peer.on('connection', listenForConnections);

function listenForConnections(conn) {
    conn.on('open', listenForData);
}

function listenForData(data) {
    console.log(data);
}