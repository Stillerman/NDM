var http = require('http')
var httpProxy = require('http-proxy')

var proxy = httpProxy.createProxyServer({})


proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('X-Special-Proxy-Header', 'foobar')
});

var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.


  proxy.web(req, res, {
    target: 'http://127.0.0.1:8080'
  });
});

console.log("listening on port 5050")
server.listen(5050);
