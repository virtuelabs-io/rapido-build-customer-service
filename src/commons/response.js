// successfully created
var created = function (body) {
    return {
        statusCode: 201,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    }
}
// internal server error
var isa = function (body) {
    return {
        statusCode: 500,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    }
}

module.exports.helper = {
    created: created,
    isa: isa
}
