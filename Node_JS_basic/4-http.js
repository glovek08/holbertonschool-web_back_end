// In a file named 4-http.js, create a small HTTP server using the http module:
//     It should be assigned to the variable app and this one must be exPORTed
//     HTTP server should listen on PORT 1245
//     Displays Hello Holberton School! in the page body for any endpoint as plain text
// In terminal 1:
// bob@dylan:~$ node 4-http.js
// ...
// In terminal 2:
// bob@dylan:~$ curl localhost:1245 && echo ""
// Hello Holberton School!
// bob@dylan:~$
// bob@dylan:~$ curl localhost:1245/any_endpoint && echo ""
// Hello Holberton School!
// bob@dylan:~$

const { createServer } = require("node:http");
// const os = require('os');

const PORT = 1245;
const HOSTNAME = "localhost";

const app = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.write("Hello Holberton School!");
  res.end();
});

app.listen(PORT, HOSTNAME, (error) => {
  if (error) {
    console.error(`Something bad happened: ${error}`);
  }
  // else {
  //   const serverAddr = app.address();
  //   console.log(
  //     `Server listening on ${serverAddr.family}${serverAddr.address}:${serverAddr.port}
  //   `);
  //   console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
  //   console.log(`HOSTNAME: ${os.hostname}`);
  // }
});

module.exports = app;
