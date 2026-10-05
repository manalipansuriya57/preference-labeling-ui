const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");
const dbPath = path.join(dataDir, "preferences.json");

function defaultDb() {
  return { pairs: [], labels: [], nextPairId: 1, nextLabelId: 1 };
}

function readDb() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dbPath)) {
    const empty = defaultDb();
    fs.writeFileSync(dbPath, JSON.stringify(empty, null, 2));
    return empty;
  }
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

function writeDb(db) {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

function getDb() {
  const data = readDb();
  return {
    data,
    save() {
      writeDb(data);
    },
  };
}

module.exports = { getDb, dbPath, readDb, writeDb };
