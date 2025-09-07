const fs = require("fs");

async function readDatabase(fileURL) {
  if (typeof fileURL !== "string") {
    throw new TypeError("File URL not a string");
  };
  return new Promise((resolve, reject) => {
    fs.readFile(fileURL, "utf-8", (error, data) => {
      if (error) {
        return reject(new Error("Cannot load the database"));
      }

      const rows = data.split("\n");
      const studentsNames = {};

      if (rows.length === 0) {
        return resolve(studentsNames);
      }
      rows.slice(1).forEach((row) => {
        try {
          const [firstname, , , location] = row.split(',');
          studentsNames[location] = studentsNames[location] || [];
          // console.log(location);
          studentsNames[location].push(firstname);
        } catch (error) {
          reject("Something bad happened: " + error);
        }
      });
      resolve(studentsNames);
    });
  });
}

// (async () => {
//   try {
//     const students = await readDatabase("../database.csv");
//     console.log(students);
//   } catch (error) {
//     console.error(error.message);
//   }
// })();
