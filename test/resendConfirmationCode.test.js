/* eslint-disable */
const util = require('util');
const lambda = require('../src/resendConfirmationCode');
const handler = util.promisify(lambda.fun);

describe(`Authentication: ResendConfirmationCode tests`, () => {

  afterEach(() => {
    process.env.CLIENTID='435fsd456fg564'
    process.env.USER_POOL_ID='ff4w345fdgfgh'
  });

  test(`Require environment variables`, () => {

    delete process.env.USER_POOL_ID;
    delete process.env.CLIENT_ID;

    const event = {};
    const context = {};

    const result = handler(event, context);
    result
      .then(data => {
        expect(data).toBeFalsy();
      })
      .catch(e => {
        expect(e).toBe(
          `Missing required environment variables: USER_POOL_ID, CLIENT_ID`
        );
      });
  });

});
