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
    let data = event.body
    let query = `
        UPDATE customer.company 
        SET company_name = ?,
            vat_number = ?,
            addr_1 = ?,
            addr_2 = ?,
            city = ?,
            county = ?,
            country = ?,
            postcode = ?
        WHERE customer_id = UUID_TO_BIN(?);
    `;

    console.log("Running query", query);
    let results = await mysql.query(query, [
            data.company_name,
            data.vat_number,
            data.addr_1,
            data.addr_2,
            data.city,
            data.county,
            data.country,  
            data.postcode,
            customer_id
        ]
    )
    await mysql.end()
    return results
}
