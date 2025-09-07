// Install Express and in a file named 6-http_express.js,
// create a small HTTP server using Express module:
//     It should be assigned to the variable app and this one must be exported
//     HTTP server should listen on port 1245
//     Displays Hello Holberton School! in the page body for the endpoint /

const express = require("express");
const os = require("os");

const app = express();
const PORT = 1245;
const HOST = "localhost";

app.get("/", (req, res) => {
  if (req.url === '/') {
    res.send("Hello Holberton School!");
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
  console.log(`Host: ${os.hostname()}`);
});

module.exports = app;

