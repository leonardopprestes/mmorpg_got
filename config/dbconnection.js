var mysql = require('mysql');

var conn = function () {
    return mysql.createConnection({
        hostname: 'localhost',
        database: 'mmorpg_got',
        user: 'root',
        password: '12345'
    })
}

module.exports = function () {
    return conn;
}

