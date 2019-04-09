const util = require("util");
const lambda = require("../src/customer-company/postCustomerCompanyDetails");
const handler = util.promisify(lambda.fun);

describe(`Testing: postCustomerCompanyDetails`, () => {
    beforeEach(() => {
        process.env.HOST = "localhost";
        process.env.PORT = "3306";
        process.env.DATABASE = "rapido";
        process.env.USERNAME = "root";
        process.env.PASSWORD = "admin";
    });

    test(`The handler exists`, () => {
      expect(handler).toBeTruthy();
    });
  
    test(`Asks for environment variables`, async () => {
        const result = await handler({
            "body": {
              "company_name": "test",
              "vat_number": "test",
              "addr_1": "test/2",
              "addr_2": "test 1",
              "city": "test",
              "county": "test",
              "country": "test",
              "postcode": "test"
            }
        }, {})
        expect(result).not.toBeNull()
    });
});