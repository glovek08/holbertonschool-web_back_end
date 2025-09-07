// In a file named 7-http_express.js, recreate the small HTTP server using Express:

// It should be assigned to the variable app and this one must be exported
// HTTP server should listen on port 1245
// It should return plain text
// When the URL path is /, it should display "Hello Holberton School!" in the page body
// When the URL path is /students, it should display:
// "This is the list of our students" followed by the same content as the file 3-read_file_async.js
// (with and without the database) - the name of the database must be passed as argument of the file
// CSV file can contain empty lines (at the end) - and they are not a valid student!

const countStudents = require('./3-read_file_async');
const app = require('./6-http_express');

app.get('/students', (req, res) => {
  if (req.url === '/students') {
    countStudents('databases.csv')
      .then((output) => {
        res.write('This is the list of our students\n');
        res.end(output);
      })
      .catch(() => {
        res.statusCode = 500;
        res.end('Cannot load the database');
      });
  }
});

// This middleware catches request to invalid endpoints.
// it should be kept at the end.
app.use((req, res) => {
  res.status(404).send('Not found. Check URL.');
});

module.exports = app;
