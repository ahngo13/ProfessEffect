const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    port:"3307",
    database:"nodejs"
});

module.exports = con;