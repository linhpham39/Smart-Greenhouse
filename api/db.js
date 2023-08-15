const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'IoT database',
    password: '123123',
    port: 5432
});

module.exports = pool;