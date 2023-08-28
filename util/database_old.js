const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user:'root',
    password: 'Polas@1982',
    database:'nodemysql'
});

module.exports = pool.promise();