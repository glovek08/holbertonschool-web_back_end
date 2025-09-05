const fs = require("fs");
const { parse } = require("csv-parse");
const { stringify } = require("csv-stringify");
const { Transform, pipeline } = require("stream");

// Using the database database.csv (provided in project description),
// create a function countStudents in the file 2-read_file.js

//    Create a function named countStudents.
//    It should accept a path in argument
//    The script should attempt to read the database file synchronously
//    If the database is not available,
//    it should throw an error with the text Cannot load the database
//    If the database is available, it should log the
//    following message to the console Number of students: NUMBER_OF_STUDENTS
//    It should log the number of students in each field,
//    and the list with the following format:
//      Number of students in FIELD: 6. List: LIST_OF_FIRSTNAMES
//    CSV file can contain empty lines (at the end) - and they are not
//     a valid student!

const INPUT = "database.csv";
const OUTPUT = "csv-throwup.csv";

const expectedColumns = ["firstname", "lastname", "age", "field"];

// normalizing each record.
class NormalizeRows extends Transform {
  constructor() {
    super({ objectMode: true });
    this.count = 0;
    this.fieldGroups = {};
  }

  _transform(record, _enc, cb) {
    // normalizing keys to upper->lower case.
    const normalized = {};
    for (const col of expectedColumns) {
      const foundKey = Object.keys(record).find(
        (k) => k.toLowerCase() === col.toLowerCase()
      );
      normalized[col] = (record[foundKey] !== null &&
      record[foundKey] !== undefined
        ? record[foundKey]
        : ""
      ).trim();
    }

    if (!normalized.firstname || !normalized.field) {
      return cb();
    }

    this.count += 1;
    if (!this.fieldGroups[normalized.field]) {
      this.fieldGroups[normalized.field] = [];
    }
    this.fieldGroups[normalized.field].push(normalized.firstname);

    this.push(normalized);
    cb();
    return 1;
  }

  _final(cb) {
    console.log(`Number of students: ${this.count}`);
    for (const [fld, list] of Object.entries(this.fieldGroups)) {
      console.log(
        `Number of students in ${fld}: ${
          list.length
        }. List: ${list.join(", ")}`
      );
    }
    cb();
  }
}

function rebuildCSV() {
  const input = fs.createReadStream(INPUT).on("error", (e) => {
    throw new Error("Cannot load the database");
  });

  const parser = parse({
    columns: true,
    trim: true,
    skip_empty_lines: true
  }).on("error", (e) => {
    throw new Error("Cannot load the database");
  });

  const normalizer = new NormalizeRows();

  const stringifier = stringify({
    header: true,
    columns: expectedColumns
  }).on("error", (e) =>
    console.error(`Stringify error: ${e.message}`)
  );

  const output = fs
    .createWriteStream(OUTPUT, { flags: "w" })
    .on("error", (e) => console.error(`Write error: ${e.message}`));
  // .on("finish", () =>
  //   // console.log(`Wrote cleaned CSV to ${OUTPUT}`)
  // );

  pipeline(input, parser, normalizer, stringifier, output, (err) => {
    if (err) {
      console.error("Pipeline failed:", err.message);
    }
  });
}

(function countStudents(fileURL = INPUT) {
  if (typeof fileURL !== "string") {
    throw new TypeError("File URL invalid data type");
  }
  rebuildCSV();
})();

module.exports = rebuildCSV;
