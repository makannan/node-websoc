var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();
var HashMap = require('hashmap');

var devices = new HashMap();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', function(connection) {
	//TODO: Read from some config file...
    connection.sendUTF("AE123MK,1,2,3,4,5");
    console.log("Sent initial header.....");

    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });

    connection.on('close', function() {
        console.log('devcontroller-protocol Connection Closed');
    });

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            controllDevice(JSON.parse(message.utf8Data));
        } else {
        	console.log("Received: '" + message);
        }
    });
});

function controllDevice(devStatus) {
	console.log("Device " + devStatus.id + " changed state to " + devStatus.value)
}
 
client.connect('ws://localhost:8080/', 'devcontroller-protocol');

