const self = {
  withBody(req, resp, handler) {
    let body = [];
    
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      const data = Buffer.concat(body).toString();
      handler(req, resp, JSON.parse(data));
    });
  }
}

module.exports = self;
