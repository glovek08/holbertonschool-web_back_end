// CommonJS Version.

const { createServer } = require(`node:http`);
const os = require('os');

const hostname = `127.0.0.1`;
const port = 5000;

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader(`Content-Type`, `text/plain`);
    res.write("Hello Papacito\n");
    res.end(`Hello World`);
});

server.listen(port, hostname, () => {
    const serverAddress = server.address();
    console.log(`Server listening on ${serverAddress.family} ${serverAddress.address}:${serverAddress.port}`);
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`Hostname: ${os.hostname}`);
})