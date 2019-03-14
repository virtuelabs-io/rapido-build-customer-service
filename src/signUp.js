'use strict';

module.exports.fun = async (event, context) => {
    global.fetch = require('node-fetch');
    var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
    const uuidv4 = require('uuid/v4');

    var data = JSON.parse(event.body);

    var poolData = {
        UserPoolId : process.env.USER_POOL_ID,
        ClientId : process.env.CLIENT_ID
    };

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    function prepareAttributes(){
        var attributeList = [];

        var dataPhoneNumber = {
            Name : 'phone_number',
            Value : data.phoneNumber
        };

        var dataEmail = {
            Name : 'email',
            Value : data.email
        };

        var dataName = {
            Name : 'name',
            Value : data.name
        };

        var dataRapidoId = {
            Name : 'custom:rapidoId',
            Value : uuidv4()
        };

        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);
        var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
        var attributeRapidoId = new AmazonCognitoIdentity.CognitoUserAttribute(dataRapidoId);

        attributeList.push(attributeEmail);
        attributeList.push(attributePhoneNumber);
        attributeList.push(attributeName);
        attributeList.push(attributeRapidoId);

        return attributeList;
    }

    async function signUpUser(phoneNumber, password, attributeList) {
        return new Promise( resolve => {
            userPool.signUp(phoneNumber, password, attributeList, null, function(err, result){
                if(err) console.log(err);
                else {
                    var cognitoUser = result.user;
                    console.log('Customer successfully registered with: ' + cognitoUser.getUsername());
                    resolve(result);
                }
            });
        })
    }

    let result = await signUpUser(data.phoneNumber, data.password, prepareAttributes());

    let response = {
        statusCode: 201,
        body: JSON.stringify(result),
        headers: {
            'Content-Type': 'application/json',
        }
    };

    context.succeed(response);

};
