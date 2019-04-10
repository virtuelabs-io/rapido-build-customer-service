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
    let address_id = Number(event.path.id)
    let data = event.body
    let query = `
        UPDATE customer.address 
        SET full_name = ?,
            address_type_id = ?,
            addr_1 = ?,
            addr_2 = ?,
            city = ?,
            county = ?,
            country = ?,
            postcode = ?
        WHERE id = ?
        AND   customer_id = UUID_TO_BIN(?);
    `;

    console.log("Running query", query);
    let results = await mysql.query(query, [
            data.full_name,
            data.address_type_id,
            data.addr_1,
            data.addr_2,
            data.city,
            data.county,
            data.country,  
            data.postcode,
            address_id,
            customer_id
        ]
    )
    await mysql.end()
    return results
}
