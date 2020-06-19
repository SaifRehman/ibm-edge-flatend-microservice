const { Node } = require("flatend");
const Database = require("better-sqlite3");

const db = new Database(":memory:");
db.exec(
  `CREATE TABLE temperature (id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    , temperature INTEGER)`
);

const all = async (ctx) =>ctx.json(await db.prepare(`SELECT id, timestamp, temperature FROM temperature`).all());
const interval = setInterval(function() {
  const temp= Math.random() * (30 - 20) + 20
  db.exec(
    `INSERT INTO temperature (temperature) VALUES( ${temp})`
  );
}, 5000);
const main = async () => {
  await Node.start({
    addrs: ["158.177.144.173:30795"],
    services: {
      all_temperature: all,
    },
  });
};

main().catch((err) => console.error(err));
