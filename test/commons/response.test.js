const responseHandler = require('../../src/commons/response');


describe(`Response handler tests`, () => { // eslint-disable-line

  test(`Success response`, () => { // eslint-disable-line
    var response = responseHandler.helper.created("201");
    expect(response.statusCode).toBe(201); // eslint-disable-line
    expect(response.body).toBe('\"201\"'); // eslint-disable-line
    expect(response.headers["Content-Type"]).toBe("application/json"); // eslint-disable-line
  });

  test(`Internal server error response`, () => { // eslint-disable-line
    var response = responseHandler.helper.isa("500");
    expect(response.statusCode).toBe(500); // eslint-disable-line
    expect(response.body).toBe('\"500\"'); // eslint-disable-line
    expect(response.headers["Content-Type"]).toBe("application/json"); // eslint-disable-line
  });

});
