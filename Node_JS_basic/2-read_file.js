const fs = require("fs");
const { parse } = require("csv-parse");
const { stringify } = require("csv-stringify");
const { Transform, pipeline } = require("stream");

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
    // normalizing keys to upper/lower case.
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
        `Number of students in ${fld}: ${list.length}. List: ${list.join(", ")}`
      );
    }
    cb();
  }
}

function rebuildCSV() {
  const input = fs
    .createReadStream(INPUT)
    .on("error", (e) => console.error(`Read error: ${e.message}`));

  const parser = parse({
    columns: true,
    trim: true,
    skip_empty_lines: true,
  }).on("error", (e) => console.error(`Parse error: ${e.message}`));

  const normalizer = new NormalizeRows();

  const stringifier = stringify({
    header: true,
    columns: expectedColumns,
  }).on("error", (e) => console.error(`Stringify error: ${e.message}`));

  const output = fs
    .createWriteStream(OUTPUT, { flags: "w" })
    .on("error", (e) => console.error(`Write error: ${e.message}`))
    .on("finish", () => console.log(`Wrote cleaned CSV to ${OUTPUT}`));

  pipeline(input, parser, normalizer, stringifier, output, (err) => {
    if (err) {
      console.error("Pipeline failed:", err.message);
    }
  });
}

rebuildCSV();

module.exports = rebuildCSV;
