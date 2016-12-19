var server = require('http').createServer()
  , url = require('url')
  , WebSocketServer = require('websocket').server
  , wss = new WebSocketServer({ httpServer: server })
  , express = require('express')
  , app = express()
  , port = 8080
  , morgan = require('morgan')
  , path = require('path')
  ,	bodyParser = require('body-parser')
  ,	HashMap = require('hashmap');
  

var devices = new HashMap()
var connections = new HashMap()
var deviceStatuses = new HashMap()

app.use(morgan("short"));
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());

app.post("/devices", function(req, resp) {
  	var device = req.body;

  	if (devices.get(device.id) != null) {
  		resp.writeHead(405, { "Content-Type": "text/plain" });
  		resp.end("Already exists; Use PUT to update the device");
  	} else {
  		devices.set(device.id, device)
  		console.log('Registered ' + JSON.stringify(device));
  		resp.send(req.body);
  	}	
});

app.put("/devices", function(req, resp) {
	var device = req.body;

  	if (devices.get(device.id) == null) {
  		resp.writeHead(405, { "Content-Type": "text/plain" });
  		resp.end("Use POST to register the device");
  	} else {
  		devices.set(device.id, device)
  		console.log('Updated ' + JSON.stringify(device));
  		resp.send(req.body);
  	}
});

app.get("/devices", function(req, resp) {
  	resp.send(devices.values());
});

app.get("/devices/:id", function(req, resp) {
    console.log('Type ' + req.params.id.type);
  	resp.send(devices.get(parseInt(req.params.id)));
});


app.post("/status", function(req, resp) {
	var deviceStatus = req.body
  console.log("Status for: " + JSON.stringify(deviceStatus))
  var id = deviceStatus.id
  var connection = null;
	if (devices.get(id) != null) {
    var key = deviceStatus.customerId + ":" + id;
    connection = connections.get(key);
    console.log("Lookedup key=" + key + " ==> " + connection)
    connection.sendUTF(JSON.stringify(deviceStatus))
 } 
  resp.send("Responded with data: " + JSON.stringify(deviceStatus));
});

wss.on('request', function(r){
  console.log("Client CONNECTED: " + r)
  var connection = r.accept("devcontroller-protocol", r.origin);

  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log("Received: '" + message.utf8Data + "'");
      var connectionHeader = message.utf8Data.split(",")
    
      for (var i=1; i<connectionHeader.length; i++) {
        var key = connectionHeader[0]+":"+connectionHeader[i];
        connections.set(key, connection);
      }
    }
    console.log("Got message from " + JSON.stringify(message))
  });

  connection.on('close', function(reasonCode, description) {
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });

});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });


