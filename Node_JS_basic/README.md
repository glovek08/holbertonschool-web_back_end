- **0-console.js**: prints in STDOUT the string argument.
- **1-stdin.js**: Execured through CLI, prints string, accepts user input, displays username.
- **2-read_file.js**: attemps to read a database file synchronously.
- **3-read_file_async.js**: attemps to read a database file asynchronously.
- **4-http.js**: creates small HTTP server.
- **5-http.js**: creates another small HTTP server listing the database.csv file.
- **6-http_express.js**: Creates a simple express HTTP server.
- **7-http_express.js**: Create a more complex express HTTP server.

### Tip:

You should extend the previously generated servers, e.g:

* In `4-http.js` you generate a HTTP server, then in `5-http.js` you can reuse it by importing the script (`require('/4-http')`). Same with task 6 and 7.

### Express.js

For this project I recommend looking at [express-generator](https://expressjs.com/en/starter/generator.html) to create a proper skeleton and run it with `npx express-generator`.
