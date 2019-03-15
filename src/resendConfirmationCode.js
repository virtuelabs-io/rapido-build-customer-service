'use strict';

module.exports.fun = async (event, context) => {
    global.fetch = require('node-fetch');
    var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
    var responseHandler = require('./commons/response');
    var cognitoBoilerPlate = require('./commons/cognitoBoilerPlate')

    var poolData = cognitoBoilerPlate.helper.poolData(process.env.CLIENT_ID, process.env.USER_POOL_ID); // eslint-disable-line
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var data = JSON.parse(event.body);
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(cognitoBoilerPlate.helper.cognitoUser(data.username, userPool));

    async function resendConfirmationCode() {
        try {
            return new Promise( resolve => {
                cognitoUser.resendConfirmationCode(function(err, result) {
                    if (err) {
                        // eslint-disable-next-line
                        console.log(err);
                        return;
                    }
                    // eslint-disable-next-line
                    console.log('Successfully resent confirmation code for:' + cognitoUser.getUsername());
                    resolve(responseHandler.helper.created(result));
                });
            })
        } catch (e) {
            return responseHandler.helper.isa({
                error: e
            })
        }
    }

    let result = await resendConfirmationCode();

    context.succeed(result);
};
