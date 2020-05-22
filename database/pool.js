const Pool = require("pg").Pool;
const connectionString = process.env.DB_URI;

const pool = new Pool({
    connectionString: connectionString,
});

module.exports = pool;