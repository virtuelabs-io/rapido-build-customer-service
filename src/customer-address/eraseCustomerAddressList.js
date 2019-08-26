// headless
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
    console.log(event)
    let customer_id = event.cognitoPoolClaims.sub
    let query = `
        UPDATE customer.address
        SET full_name = NULL,
            addr_1 = NULL,
            addr_2 = NULL,
            city = NULL,
            county = NULL,
            country = NULL,
            postcode = NULL,
            active = FALSE
        WHERE customer_id = UUID_TO_BIN(?);
    `;

    console.log("Running query", query);
    let results = await mysql.query(query, [ customer_id ])
    await mysql.end()
    return results
}
