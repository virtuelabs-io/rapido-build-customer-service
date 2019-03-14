'use strict';

module.exports.fun = async (event, context) => {
    global.fetch = require('node-fetch');
    var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
    var cognitoSchema = require('./commons/cognitoSchema');
    var responseHandler = require('./commons/response');
    var cognitoBoilerPlate = require('./commons/cognitoBoilerPlate')

    var data = JSON.parse(event.body);

    var poolData = cognitoBoilerPlate.helper.poolData(process.env.CLIENT_ID, process.env.USER_POOL_ID);

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    async function signUpUser(phoneNumber, password, attributeList) {
        try {
            return new Promise( resolve => {
                userPool.signUp(phoneNumber, password, attributeList, null, function(err, result){
                    if(err) console.log(err); // eslint-disable-line
                    else {
                        var cognitoUser = result.user;
                        // eslint-disable-next-line
                        console.log('Customer successfully registered with: ' + cognitoUser.getUsername());
                        resolve(responseHandler.helper.created(result));
                    }
                });
            })
        } catch (e) {
            return responseHandler.helper.isa({
                error: e
            })
        }
    }

    let result = await signUpUser(data.phoneNumber, data.password, cognitoSchema.helper.create(data));

    context.succeed(result);
};
