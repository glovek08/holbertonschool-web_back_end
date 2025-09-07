"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _http = _interopRequireDefault(require("http"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var server = _http["default"].createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Hello Mamacita\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
var _default = exports["default"] = server;