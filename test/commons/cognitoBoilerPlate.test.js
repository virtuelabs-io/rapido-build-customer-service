/* eslint-disable */
const cognitoBoilerPlate = require('../../src/commons/cognitoBoilerPlate');


describe(`Cognito helpers`, () => {

  test(`Pool data helper`, () => {
    var poolData = cognitoBoilerPlate.helper.poolData("client_id", "user_pool_id");
    expect(poolData.ClientId).toEqual("client_id");
    expect(poolData.UserPoolId).toEqual("user_pool_id");
  });

  test(`CognitoUser data helper`, () => {
    var cognitoUser = cognitoBoilerPlate.helper.cognitoUser("+440000000000", "userPool");
    expect(cognitoUser.Username).toEqual("+440000000000");
    expect(cognitoUser.Pool).toEqual("userPool");
  });

  test(`Cognito credentails data helper`, () => {
    var cognitoCredentials = cognitoBoilerPlate.helper.cognitoCredentials("+440000000000", "password");
    expect(cognitoCredentials.Username).toEqual("+440000000000");
    expect(cognitoCredentials.Password).toEqual("password");
  });

});
