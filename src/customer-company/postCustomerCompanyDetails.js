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
    let customer_id = "887d0da4-5af3-11e9-8647-d663bd873d93" // to be replaced with user id
    let data = event.body
    let query = `
        INSERT INTO 
            customer.company (
                customer_id,
                company_name,
                vat_number,
                addr_1,
                addr_2,
                city,
                county,
                country,
                postcode
            )
        VALUES (UUID_TO_BIN(?),?,?,?,?,?,?,?,?);
    `;

    console.log("Running query", query);
    let results = await mysql.query(query, [
            customer_id,
            data.company_name,
            data.vat_number,
            data.addr_1,
            data.addr_2,
            data.city,
            data.county,
            data.country,  
            data.postcode
        ]
    )
    await mysql.end()
    return results
}
