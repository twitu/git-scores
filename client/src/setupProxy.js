const proxy = require('http-proxy-middleware');
//api calls go here
module.exports = function(app) {
  app.use(proxy('/webhook', { target: 'http://localhost:8080/' }));
};