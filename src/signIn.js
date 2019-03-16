'use strict';

module.exports.fun = async (event, context) => {
    global.fetch = require('node-fetch');
    var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
    var responseHandler = require('./commons/response');
    var cognitoBoilerPlate = require('./commons/cognitoBoilerPlate')

    var data = JSON.parse(event.body);
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(cognitoBoilerPlate.helper.cognitoCredentials(
        data.username,
        data.password
    ));

    var poolData = cognitoBoilerPlate.helper.poolData(process.env.CLIENT_ID, process.env.USER_POOL_ID); // eslint-disable-line
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(cognitoBoilerPlate.helper.cognitoUser(data.username, userPool));

    async function signIn(authenticationDetails) {
        try {
            return new Promise( resolve => {
                cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: function (result) {
                        // eslint-disable-next-line
                        console.log('Successfully signed user in:' + cognitoUser.getUsername());
                        resolve(responseHandler.helper.get({
                            accessToken: result.getAccessToken().getJwtToken(),
                            refreshToken: result.getRefreshToken().getToken(),
                            idToken: result.getIdToken().getJwtToken(),
                            accessTokenExpiration: result.getAccessToken().getExpiration(),
                            idTokenExpiration: result.getIdToken().getExpiration()
                        }));
                    },
                    onFailure: function(err) {
                        // eslint-disable-next-line
                        console.log(err);
                    }
                });
            })
        } catch (e) {
            return responseHandler.helper.isa({
                error: e
            })
        }
    }

    let result = await signIn(authenticationDetails);

    context.succeed(result);
};
