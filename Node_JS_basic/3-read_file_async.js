const fs = require("fs");
const { parse } = require("csv-parse");
const { stringify } = require("csv-stringify");
const { Transform } = require("stream");
// the async pipeline comes from /stream/promises, sync comes from /stream.
const { pipeline } = require("stream/promises");

// Using the database database.csv (provided in project description), create a function countStudents in the file 3-read_file_async.js
//     Create a function named countStudents. It should accept a path in argument (same as in 2-read_file.js)
//     The script should attempt to read the database file asynchronously
//     The function should return a Promise
//     If the database is not available, it should throw an error with the text Cannot load the database
//     If the database is available, it should log the following message to the console Number of students: NUMBER_OF_STUDENTS
//     It should log the number of students in each field, and the list with the following format: Number of students in FIELD: 6. List: LIST_OF_FIRSTNAMES
//     CSV file can contain empty lines (at the end) - and they are not a valid student!

const INPUT = "database.csv";
const OUTPUT = "csv-throwup.csv";

const expectedColumns = ["firstname", "lastname", "age", "field"];

// normalizing each record.
class NormalizeRows extends Transform {
  constructor(opts = {}) {
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
      normalized[col] = (record[foundKey] ?? "").trim();
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

async function rebuildCSV() {
  const input = fs.createReadStream(INPUT);

  const parser = parse({
    columns: true,
    trim: true,
    skip_empty_lines: true
  });

  const normalizer = new NormalizeRows();

  const stringifier = stringify({
    header: true,
    columns: expectedColumns
  });

  const output = fs.createWriteStream(OUTPUT, { flags: "w" });

  try {
    await pipeline(input, parser, normalizer, stringifier, output);
    // console.log(`Wrote cleaned CSV to ${OUTPUT}`);
  } catch (err) {
    console.error("Pipeline failed:", err.message);
  }
}

(async function countStudents(fileURL = INPUT) {
  if (typeof fileURL !== "string") {
    throw new TypeError("File URL invalid data type");
  }
  rebuildCSV().catch((err) => console.error(err));
})();

module.exports = rebuildCSV;
