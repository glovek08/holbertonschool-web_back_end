const fs = require("fs");
// const { parse } = require('csv-parse');
// const { Transform } = require('stream');
// const { pipeline } = require('stream/promises');

// Using the database database.csv (provided in project description),
// create a function countStudents in the file 3-read_file_async.js
// Create a function named countStudents. It should accept a path
// in argument (same as in 2-read_file.js)
// The script should attempt to read the database file asynchronously
// The function should return a Promise
// If the database is not available, it should throw an error with
// the text Cannot load the database
// If the database is available, it should log the following message
// to the console Number of students: NUMBER_OF_STUDENTS
// It should log the number of students in each field, and the list with
// the following format: Number of students in FIELD: 6. List: LIST_OF_FIRSTNAMES
// CSV file can contain empty lines (at the end) - and they are not a
// valid student!

const INPUT = "database.csv";
const expectedColumns = ["firstname", "lastname", "age", "field"];

/**
 * Asynchronously reads and processes a student database CSV file.
 * Counts total students and groups them by field, then logs the results to console.
 *
 * The CSV file should contain headers matching the expected columns.
 * Empty lines and records without firstname or field are ignored.
 *
 * @async
 * @function countStudents
 * @param {string} [fileURL=INPUT] - Path to the CSV file to process
 * @returns {Promise<void>} A promise that resolves when processing is complete
 * @throws {TypeError} When fileURL is not a string
 * @throws {Error} When the database file cannot be loaded
 *
 * @example
 * // Using default file
 * countStudents()
 *   .then(() => console.log('Processing complete'))
 *   .catch(err => console.error('Error:', err));
 *
 * @example
 * // Using custom file path
 * countStudents('./students.csv')
 *   .then(() => console.log('Processing complete'))
 *   .catch(err => console.error('Error:', err));
 *
 * @example
 * // Expected console output format:
 * // Number of students: 10
 * // Number of students in CS: 6. List: Johann, Arielle, Jonathan, Emmanuel, Guillaume, Katie
 * // Number of students in SWE: 4. List: Guillaume, Joseph, Paul, Tommy
 */
function countStudents(fileURL = INPUT) {
  if (typeof fileURL !== "string") {
    throw new TypeError("File URL invalid data type");
  }

  return new Promise((resolve, reject) => {
    fs.readFile(fileURL, (err, buffer) => {
      if (err) return reject(new Error("Cannot load the database"));

      let count = 0;
      const fieldGroups = {};
      const expectedColumnsSet = new Set(
        expectedColumns.map((c) => c.toLowerCase())
      );

      const lines = [];
      let currentLine = [];
      let currentCell = [];

      for (let i = 0; i < buffer.length; i += 1) {
        const byte = buffer[i];
        if (byte === 10 || byte === 13) {
          // new line and return characters
          if (currentCell.length > 0 || currentLine.length > 0) {
            currentLine.push(
              Buffer.from(currentCell)
                .toString()
                .trim()
            );
            currentCell = [];
            if (currentLine.some((c) => c)) {
              lines.push(currentLine);
            }
            currentLine = [];
          }
          if (byte === 13 && buffer[i + 1] === 10) i += 1;
        } else if (byte === 44) {
          // comma
          currentLine.push(
            Buffer.from(currentCell)
              .toString()
              .trim()
          );
          currentCell = [];
        } else {
          currentCell.push(byte);
        }
      }

      if (currentCell.length || currentLine.length) {
        currentLine.push(
          Buffer.from(currentCell)
            .toString()
            .trim()
        );
        if (currentLine.some((c) => c)) lines.push(currentLine);
      }

      if (lines.length === 0) return resolve("Number of students: 0");
      const header = lines.shift().map((h) => h.toLowerCase());

      lines.forEach((line) => {
        const record = {};
        header.forEach((col, i) => {
          if (expectedColumnsSet.has(col)) {
            const charAtLine = (record[col] = line[i]) || "";
            return charAtLine;
          }
          return null;
        });
        if (!record.firstname || !record.field) return;

        count += 1;
        if (!fieldGroups[record.field])
          fieldGroups[record.field] = [];
        fieldGroups[record.field].push(record.firstname);
      });
      let output = `Number of students: ${count}\n`;
      Object.entries(fieldGroups).forEach(([fld, list]) => {
        output += `Number of students in ${fld}: ${
          list.length
        }. List: ${list.join(", ")}\n`;
      });

      resolve(output.trim());
      return 1;
    });
  });
}

// countStudents("mamacito");

module.exports = countStudents;
