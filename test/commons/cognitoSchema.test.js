/* eslint-disable */
const cognitoSchema = require('../../src/commons/cognitoSchema');
const dataStub = require('../stubs/cognitoSchema.json');


describe(`Cognito schema create test`, () => { 

  test(`Validate schema creation`, () => {
    var result = cognitoSchema.helper.create(dataStub.create);
    expect(result.length).toBe(4);
    var keys = ["email", "custom:rapidoId", "phone_number", "name"];
    var values = Object.values(dataStub.create);
    result.forEach( e => {
        expect(keys).toContain(e.getName());
        if (e.getName() != "custom:rapidoId") {
            expect(values).toContain(e.getValue());
        }
    })
  });

});
