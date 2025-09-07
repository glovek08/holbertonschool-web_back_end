// In a file named 7-http_express.js, recreate the small HTTP server using Express:

// It should be assigned to the variable app and this one must be exported
// HTTP server should listen on port 1245
// It should return plain text
// When the URL path is /, it should display "Hello Holberton School!" in the page body
// When the URL path is /students, it should display:
// "This is the list of our students" followed by the same content as the file 3-read_file_async.js
// (with and without the database) - the name of the database must be passed as argument of the file
// CSV file can contain empty lines (at the end) - and they are not a valid student!

const app = require("./6-http_express");
const countStudents = require('./3-read_file_async');

app.get("/students", async (req, res) => {
  countStudents('database.csv')
    .then((output) => {
      res.set("Content-Type", "text/plain");
      res.send(`This is the list of our students\n${output}`);
    })
    .catch((error) => {
      res.set("Content-Type", "text/plain");
      res.send(`This is the list of our students\n${error.message}`);
    });
});

// This middleware catches request to invalid endpoints.
// it should be kept at the end.
app.use((req, res) => {
  res.status(404).send("Not found. Check URL.");
});

module.exports = app;
