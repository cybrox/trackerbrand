const mime = require('mime-types');
const http = require('http');
const url = require('url');
const fs = require('fs');

const positionController = require('./webserver/position');

const self = {
  listenOnPort(port) {
    http.createServer((request, response) => {
      const requestUrl = url.parse(request.url).pathname.trim();
      self.routeRequest([request.method, requestUrl], request, response);
    }).listen(port);
  },

  routeRequest(route, req, resp) {
    // Redirect to the route we deem most interesting on index
    if (route[0] == 'GET' && route[1] == '/') {
      response.writeHead(302, { 'Location': '/position/display#show:live' });
      response.end();
    }

    self.route('GET', '/position/display', route, req, resp, positionController, 'show');
    self.route('GET', '/position/history', route, req, resp, positionController, 'getHistory');
    self.route('GET', '/position/latest', route, req, resp, positionController, 'getLatest');

    self.route('POST', '/position/add', route, req, resp, positionController, 'addLocal');
    self.route('POST', '/position/add-remote', route, req, resp, positionController, 'addRemote');
    self.route('POST', '/position/add-remotes', route, req, resp, positionController, 'addRemotes');

    self.route('POST', '/position/setup', route, req, resp, positionController, 'setup');

    self.routeStaticFile(route, req, resp);

    if (!req.__handlingRequest) {
      resp.writeHead(404);
      resp.end('Not found');
    }
  },

  routeStaticFile(route, req, resp) {
    if (route[0] == 'GET' && route[1].indexOf('/resource/') === 0) {
      const actualPath = `interface/${route[1].replace('/resource/', '')}`;
      if (fs.existsSync(actualPath)) {
        resp.setHeader('Content-Type', mime.lookup(actualPath));
        resp.writeHead(200);
        req.__handlingRequest = true;
        fs.createReadStream(actualPath).pipe(resp);
      }
    }
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
