'use strict';

const mysql = require('serverless-mysql')({
    config: {
        host: process.env.HOST,
        user: process.env.USERNAME,
        port: process.env.PORT,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
  })

module.exports.fun = async (event, context, callback) => {
    global.fetch = require('node-fetch');
    let results = await mysql.query('SELECT * FROM `mysql`.`db` LIMIT 1000;')
    await mysql.end()
    return results
}