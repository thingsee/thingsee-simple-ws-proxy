# Thingsee Simple WebSocket proxy module for Node

Simplest possible HTTP-to-WS proxy to forward Thingsee One HTTP POST requests to Websocket connections.

This proxy provides no authentication, no authorization, no security and no proper publish/subscribe funcitonality. It takes the received HTTP POST requests from a Thingsee One device and just forwards them over a WebSocket to the last client that has requested them.

## Installation

```npm install thingsee-simple-ws-proxy --save```

## Usage

Configure your Thingsee One to send it's events to your proxy server. The default API path is SERVERNAME:PORT/api/events.

Add the proxy to your node app.

```javascript

// Launch HTTP-to-WS proxy
var TSWS = require('thingsee-ws-proxy');

var settings = {
    wsPort:     8101,
    httpPort:   8100,
    apiPath:    '/api/events'
    //httpHost:   '',
}

var ws = TSWS.listen(settings);

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

## Release History

* 0.0.1 Initial release
* 0.0.2 Typo fixes
