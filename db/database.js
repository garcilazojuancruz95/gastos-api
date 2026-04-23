const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/gastos.db');

//Crea tabla
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS movimientos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        monto REAL,
        tipo TEXT
      )
    `);
});

module.exports = db;