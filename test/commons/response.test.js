/* eslint-disable */
const responseHandler = require('../../src/commons/response');


describe(`Response handler tests`, () => {

  test(`Success response`, () => {
    var response = responseHandler.helper.created("201");
    expect(response.statusCode).toBe(201);
    expect(response.body).toBe('\"201\"');
    expect(response.headers["Content-Type"]).toBe("application/json");
  });

  test(`Internal server error response`, () => {
    var response = responseHandler.helper.isa("500");
    expect(response.statusCode).toBe(500);
    expect(response.body).toBe('\"500\"');
    expect(response.headers["Content-Type"]).toBe("application/json");
  });

  test(`GET Success response`, () => {
    var response = responseHandler.helper.get("200");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('\"200\"');
    expect(response.headers["Content-Type"]).toBe("application/json");
  });

});
