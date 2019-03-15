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

var cognitoCredentials = function(username, password){
    return {
        Username: username,
        Password: password
    }
}

module.exports.helper = {
    poolData: poolData,
    cognitoUser: cognitoUser,
    cognitoCredentials: cognitoCredentials
}
