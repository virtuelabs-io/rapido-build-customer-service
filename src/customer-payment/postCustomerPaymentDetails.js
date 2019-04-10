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
            customer.payment (
                customer_id,
                name_on_card,
                card_number,
                expirity_month,
                expirity_year,
                address_id,
                payment_type_id
            )
        VALUES (UUID_TO_BIN(?),?,?,?,?,?,?);
    `;

    console.log("Running query", query);
    let results = await mysql.query(query, [
            customer_id,
            data.name_on_card,
            data.card_number,
            data.expirity_month,
            data.expirity_year,
            data.address_id,
            data.payment_type_id
        ]
    )
    await mysql.end()
    return results
}
