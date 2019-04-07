'use strict';

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    port: process.env.PORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

module.exports.fun = async (event, context, callback) => {
    global.fetch = require('node-fetch');
    context.callbackWaitsForEmptyEventLoop = false;
    connection.query('SELECT * FROM `mysql`.`db` LIMIT 1000;', function (error, results) {
        if (error) {
            connection.destroy();
            throw error;
        } else {
            console.log(results);
            callback(error, results);
            connection.end(function (err) { callback(err, results);});
        }
    });
}