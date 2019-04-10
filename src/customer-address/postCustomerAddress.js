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
        INSERT INTO 
            customer.address (
                customer_id,
                full_name,
                address_type_id,
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
            data.full_name,
            data.address_type_id,
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
