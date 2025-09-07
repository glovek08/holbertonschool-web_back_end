// Using the database database.csv (provided in project description),
// create a function countStudents in the file 3-read_file_async.js
// Create a function named countStudents. It should accept a fileURL
// in argument (same as in 2-read_file.js)
// The script should attempt to read the database file asynchronously
// The function should return a Promise
// If the database is not available, it should throw an error with
// the text Cannot load the database
// If the database is available, it should log the following message
// to the console Number of students: NUMBER_OF_STUDENTS
// It should log the number of students in each field, and the list with
// the following format: Number of students in FIELD: 6. List: LIST_OF_FIRSTNAMES
// CSV file can contain empty rows (at the end) - and they are not a
// valid student!

const fs = require("fs");

function countStudents(fileURL) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileURL, "utf8", (err, data) => {
      if (err) {
        reject(new Error("Cannot load the database"));
        return;
      }
      const outputLines = [];
      const rows = data.toString().split("\n");
      const nonEmptyLines = [];

      for (let i = 0; i < rows.length; i++) {
        if (rows[i].trim() !== "") {
          nonEmptyLines.push(rows[i]);
        }
      }

      if (nonEmptyLines.length <= 1) {
        const msg = "Number of students: 0";
        console.log(msg);
        outputLines.push(msg);
        resolve(outputLines.join('\n'));
        return;
      }

      const header = nonEmptyLines[0].split(",");
      let firstnameIndex = -1;
      let fieldIndex = -1;

      for (let i = 0; i < header.length; i++) {
        if (header[i].trim() === "firstname") {
          firstnameIndex = i;
        }
        if (header[i].trim() === "field") {
          fieldIndex = i;
        }
      }
      
      const studentCount = nonEmptyLines.length - 1;
      const countMsg = `Number of students: ${studentCount}`;
      console.log(countMsg);
      outputLines.push(countMsg);
      
      const fieldGroups = {};

      for (let i = 1; i < nonEmptyLines.length; i++) {
        const studentData = nonEmptyLines[i].split(",");
        const firstname = studentData[firstnameIndex].trim();
        const field = studentData[fieldIndex].trim();
        if (fieldGroups[field] === undefined) {
          fieldGroups[field] = [firstname];
        } else {
          fieldGroups[field].push(firstname);
        }
      }
      
      for (const field in fieldGroups) {
        if (Object.prototype.hasOwnProperty.call(fieldGroups, field)) {
          const students = fieldGroups[field];
          const fieldMsg = `Number of students in ${field}: ${students.length}. List: ${students.join(", ")}`;
          console.log(fieldMsg);
          outputLines.push(fieldMsg);
        }
      }
      resolve(outputLines.join('\n'));
    });
  });
}

// countStudents("papacito");

module.exports = countStudents;
