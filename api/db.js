// const Pool = require('pg').Pool;

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'IoT database',
//     password: '123123',
//     port: 5432
// });

// module.exports = pool;

//connect to mysql
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123123",
    database: "GREENHOUSE",
});

module.exports = con;