const { defineFeature, loadFeature } = require("jest-cucumber")
const app = require("../app");
const supertest = require("supertest");
const req = supertest(app)

const feature = loadFeature(
  "./features/ID002_Log_In.feature"
);

let responseMessage = "";
let responseStatus = "";

defineFeature(feature, (test, background) => {
  let loggedIn = false;

  afterEach(() => {
    loggedIn = false;
  });

  test('Attempt to log in with invalid username (Error Flow)', ({ given, when, and, then }) => {
    given(/^a student account with (.*) and (.*) exists$/, async (username, password) => {
      const user = await req.post("/createAccount").send({ username, password });
    });

    when(/^student enters a wrong username (.*) and student enters valid password (.*)$/, async (input_username, password) => {
      const res = await req.post("/login").send({
        username: input_username,
        password
      });
      responseStatus = res.statusCode;
      responseMessage = res.body.message;

      loggedIn = responseStatus === 200;
    });

    then('student should not be logged in', () => {
      expect(loggedIn).toBe(false);
    });

    and(/^student should see the error message "(.*)"$/, (errorMsg) => {
      expect(errorMsg).toBe(responseMessage);
    });
  });


  test('Attempt to log in with invalid password (Error Flow)', ({ given, when, and, then }) => {
    given(/^a student account with (.*) and (.*) exists$/, async (username, password) => {
      const user = await req.post("/createAccount").send({ username, password });
    });

    when(/^student enters valid username (.*) and a wrong password (.*)$/, async (username, input_password) => {
      const res = await req.post("/login").send({
        username,
        password: input_password
      });
      responseStatus = res.statusCode;
      responseMessage = res.body.message;

      loggedIn = responseStatus === 200;
    });

    then('student should not be logged in', () => {
      expect(loggedIn).toBe(false);
    });

    and(/^student should see the error message "(.*)"$/, (errorMsg) => {
      expect(errorMsg).toBe(responseMessage);
    });
  });


  test('Log in with valid credentials (Normal Flow)', ({ given, when, and, then }) => {
    given(/^a student account with (.*) and (.*) exists$/, (arg0, arg1) => {
      pending();
    });

    when(/^student enters a valid username (.*)$/, (arg0) => {
      pending();
    });

    and(/^student enters corresponding valid password (.*)$/, (arg0) => {
      pending();
    });

    and('student requests to log in', () => {
      pending();
    });

    then('student should be successfully logged in', () => {
      pending();
    });
  });
})








