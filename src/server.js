

var peer = new Peer(); 
var connected = false;
var conn;
var msgs = [];

peer.on('open', function(id){
    bindIdToUI(id);
})

peer.on('connection', listenForConnections);

var inputElement = document.getElementById("inputChat");
var inputSend = document.getElementById("inputSend");
inputSend.onclick = handleConnection;


function listenForConnections(conn) {
    console.log("conns", conn);
    conn.on('open', function() {
        console.log("Connection opened");
        conn.on('data', writeMessage);
    });
}


function writeMessage(msg) {
    msgs.push(msg);
    console.log(msgs);
    document.getElementById("msgs").innerText = msgs.join("\n");  
    console.log(document.getElementById("msgs")); 
}

function handleConnection() {
    console.log('running...');
    if (!connected) {
        var connectionId = inputElement.value;
        if (!connectionId) return;
        var c = peer.connect(connectionId);
        console.log(c);
        listenForConnections(c);
        conn = c;
        connected = true;
        inputSend.innerText = "Send";
        return;
    }
    var msg = inputElement.value;
    console.log("sending message", msg);
    conn.send(msg);
}

function bindIdToUI(id) {
    var id_input = document.getElementById('peer-id-input');
        id_input.value = id;
        id_input.onclick = function() {
            var copyText = id_input;
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand("copy");
        }
}

// Default export
export default {
  peer: peer
};