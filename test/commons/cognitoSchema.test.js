const cognitoSchema = require('../../src/commons/cognitoSchema');
const dataStub = require('../stubs/cognitoSchema.json');


describe(`Cognito schema create test`, () => { // eslint-disable-line

  test(`Validate schema creation`, () => { // eslint-disable-line
    var result = cognitoSchema.helper.create(dataStub.create);
    expect(result.length).toBe(4); // eslint-disable-line
    var keys = ["email", "custom:rapidoId", "phone_number", "name"];
    var values = Object.values(dataStub.create);
    result.forEach( e => {
        expect(keys).toContain(e.getName()); // eslint-disable-line
        if (e.getName() != "custom:rapidoId") {
            expect(values).toContain(e.getValue()); // eslint-disable-line
        }
    })
  });

});
