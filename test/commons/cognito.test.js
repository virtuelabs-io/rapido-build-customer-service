const cognitoBoilerPlate = require('../../src/commons/cognitoBoilerPlate');


describe(`Cognito helpers`, () => { // eslint-disable-line

  test(`Pool data helper`, () => { // eslint-disable-line
    var poolData = cognitoBoilerPlate.helper.poolData("client_id", "user_pool_id");
    expect(poolData.ClientId).toEqual("client_id"); // eslint-disable-line
    expect(poolData.UserPoolId).toEqual("user_pool_id"); // eslint-disable-line
  });

  test(`CognitoUser data helper`, () => { // eslint-disable-line
    var cognitoUser = cognitoBoilerPlate.helper.cognitoUser("+440000000000", "userPool");
    expect(cognitoUser.Username).toEqual("+440000000000"); // eslint-disable-line
    expect(cognitoUser.Pool).toEqual("userPool"); // eslint-disable-line
  });

});
