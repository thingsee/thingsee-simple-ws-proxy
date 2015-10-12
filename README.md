# Thingsee WebSocket proxy module for Node

A rudimentary proxy to forward Thingsee One HTTP POST requests to Websocket connections.

## Installation

```npm install thingsee-ws-proxy --save```

## Usage

Add the proxy to your node app.

```javascript

// Launch HTTP-to-WS proxu
var TSWS = require('thignsee-ws-proxy');
var ws = TSWS.listen(8001);

```

Subscribe to device events from your web app.

```javascript

// Open a websocket connection the TS proxy server
var ws = new WebSocket('ws://' + window.location.hostname + ':8001' );

// Subscribe to device events by providing the device UUID
ws.onopen = function() {
  ws.send(deviceUuid);  // Register device (only one listener per device)
};

// Implement a receiver for device events
ws.onmessage = function(e) {

// Do something with event data, eg.
  var payload = JSON.parse(e.data);
  updateGameLoop(payload);
};

ws.onclose = function() {
  //Proxy handles closed connections automatically.
  console.log("ws closed");
};

```