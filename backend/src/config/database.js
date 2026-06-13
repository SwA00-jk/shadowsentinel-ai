const { Pool } = require("pg");

const pool = new Pool({
    user: "swarakunbi",
    host: "localhost",
    database: "shadowsentinel",
    port: 5432
});

module.exports = pool;