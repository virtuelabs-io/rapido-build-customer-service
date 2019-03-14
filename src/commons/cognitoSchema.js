global.fetch = require('node-fetch');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const uuidv4 = require('uuid/v4');

var create = function (data) {
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

module.exports.helper = {
    create: create
}
