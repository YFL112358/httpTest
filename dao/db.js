const mysql = require('mysql');

const baseAbsPath = __dirname + '/';
const fs = require('fs');
const yaml = require('js-yaml');
const mysqlConfig = yaml.safeLoad(fs.readFileSync(baseAbsPath + '../config/mysql.conf', 'utf8'));

const pool = mysql.createPool({
    connectionLimit: mysqlConfig.connectionLimit,
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database    
});

function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();//释放链接
        });
    });
}
exports.query = query;
