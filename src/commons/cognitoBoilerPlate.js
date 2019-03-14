var poolData = function(clientId, userPoolId){
    return {
        UserPoolId : userPoolId, // eslint-disable-line
        ClientId : clientId // eslint-disable-line
    }
}

module.exports.helper = {
    poolData: poolData
}
