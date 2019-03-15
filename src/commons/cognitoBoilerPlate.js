var poolData = function(clientId, userPoolId){
    return {
        UserPoolId : userPoolId, // eslint-disable-line
        ClientId : clientId // eslint-disable-line
    }
}

var cognitoUser = function(username, userPool){
    return {
        Username : username,
        Pool : userPool
    };
}

module.exports.helper = {
    poolData: poolData,
    cognitoUser: cognitoUser
}
