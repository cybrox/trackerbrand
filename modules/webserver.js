const http = require('http');
const url = require('url');

const positionController = require('./webserver/position');

const self = {
  listenOnPort(port) {
    http.createServer((request, response) => {
      const requestUrl = url.parse(request.url).pathname.trim();
      self.routeRequest([request.method, requestUrl], request, response);
    }).listen(port);
  },

  routeRequest(route, req, resp) {
    self.route('GET', '/position/display', route, req, resp, positionController, 'show');
    self.route('GET', '/position/latest', route, req, resp, positionController, 'get');
    self.route('POST', '/position/add', route, req, resp, positionController, 'add');
    
    self.route('POST', '/position/setup', route, req, resp, positionController, 'setup');
  
    if (!req.__handlingRequest) resp.writeHead(404).end('Not found');
  },

  route(verb, path, routeInfo, request, response, controller, handler) {
    if (verb == routeInfo[0] && path == routeInfo[1]) {
      if (controller[handler]) {
        request.__handlingRequest = true;
        controller[handler](request, response);
      }
    }
  }
};

module.exports = self;
