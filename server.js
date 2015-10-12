var ws = require("nodejs-websocket")
var Hapi = require('hapi');
var apiServer = new Hapi.Server();
var clientList = {};

function startWebSocket(port) {
  var wsserver = ws.createServer(function(conn) {
    conn.on("text", function(str) {
      console.log('Client registered ' + str);
      clientList[str] = conn;
    })
    conn.on("close", function(code, reason) {
      for (var property in clientList) {
        if (clientList.hasOwnProperty(property)) {
          delete clientList[property]:
        }
      }
      console.log("Connection closed")
    })
  }).listen(port, console.log('WS server running on port: ' + port));
}

function startAPI(settings) {

  apiServer.connection({
    host: settings.httpHost,
    port: httpPort
  })
  apiServer.route({
    method: 'POST',
    path: settings.apiPath,
    handler: function(request, reply) {

      var dId = request.headers.deviceauthuuid;

      if (clientList.hasOwnProperty(dId)) {
        console.log('Event from registered device ' + dId);

        clientList[dId].sendText(request.payload);
      }
      reply();
    }
  })

  apiServer.start(function() {
    console.log('APIServer running at:', server.info.uri);
  });

}

module.exports = function(settings) {
  startWebSocket(settings.wsPort);
  startAPI(settings);
};