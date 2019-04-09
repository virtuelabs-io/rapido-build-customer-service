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
    let customer_id = "08bb88a0-5ac3-11e9-8647-d663bd873d93" // to be replaced with user id
    let query = `
        SELECT  BIN_TO_UUID(customer_id) as customer_id,
                company_name,
                vat_number,
                addr_1,
                addr_2,
                city,
                county,
                country,
                postcode
        FROM customer.company 
        WHERE customer_id = UUID_TO_BIN(?);
    `;

    query = query.replace("{0}", customer_id);
    console.log("Running query", query);
    let results = await mysql.query(query, [customer_id])
    await mysql.end()
    return results[0]
}
