// copied, initially, "whole cloth" from Claude.ai
// also via https://idx.google.com/
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2310447541.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2116284359.
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

const HTTP_PORT = 3000;
const APP_CONTEXT = "/myApp";
const PAGES_BASE = APP_CONTEXT + "/pages";


const logRequest = (req, _res, next) => {
  console.log(">> ".concat(req.method, " ", req.url));
  next();
};

function initApp() {
  app.use(cors());
  app.options("*", cors());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logRequest);
}

function initServices() {

}

initApp();
initServices();


const HOSTNAME = '127.0.0.1';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(HTTP_PORT, HOSTNAME, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
