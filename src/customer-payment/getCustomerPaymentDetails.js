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
    let payment_id = Number(event.path.id)
    let query = `
        SELECT  id,
                BIN_TO_UUID(customer_id) as customer_id,
                name_on_card,
                RIGHT(card_number, 4) as card_number,
                expirity_month,
                expirity_year,
                address_id,
                payment_type_id
        FROM customer.payment 
        WHERE id = ?
        AND   customer_id = UUID_TO_BIN(?)
        LIMIT 1;
    `;
    console.log("Running query", query);
    let results = await mysql.query(query, [payment_id, customer_id])
    await mysql.end()
    return results[0]
}
