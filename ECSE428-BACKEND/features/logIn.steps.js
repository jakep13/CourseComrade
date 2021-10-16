const request = require('./setup/request');
const { defineFeature, loadFeature } = require("jest-cucumber")


const feature = loadFeature(
  "./features/ID002_Log_In.feature"
);

let responseMessage = "";
let responseStatus = "";

defineFeature(feature, (test) => {
  let loggedIn = false;

  afterEach(() => {
    loggedIn = false;
  });

  test('Attempt to log in with invalid username (Error Flow)', ({ given, when, and, then }) => {
    given(/^a student account with (.*) and (.*) exists$/, async (username, password) => {
      const user = await request.post("/createAccount").send({ username, password });
    });

    when(/^student enters a wrong username (.*) and student enters valid password (.*)$/, async (input_username, password) => {
      const res = await request.post("/login").send({
        username: input_username,
        password
      });
      responseStatus = res.statusCode;
      // responseMessage = res.;

      loggedIn = responseStatus === 666;
    });

    then('student should not be logged in', () => {
      expect(loggedIn).toBe(false);
    });

    and(/^student should see the error message "(.*)"$/, (arg0) => {
      pending();
    });
  });


  test('Attempt to log in with invalid password (Error Flow)', ({ given, when, and, then }) => {
    given(/^a student account with (.*) and (.*) exists$/, (arg0, arg1) => {

    });

    when(/^student enters valid username (.*)$/, (arg0) => {

    });

    and(/^student enters a wrong password (.*)$/, (arg0) => {

    });

    and('student requests to log in', () => {

    });

    then('student should be not be logged in', () => {

    });

    and(/^student should see the error message "(.*)"$/, (arg0) => {

    });
  });


  test('Log in with valid credentials (Normal Flow)', ({ given, when, and, then }) => {
    given(/^a student account with (.*) and (.*) exists$/, (arg0, arg1) => {

    });

    when(/^student enters a valid username (.*)$/, (arg0) => {

    });

    and(/^student enters corresponding valid password (.*)$/, (arg0) => {

    });

    and('student requests to log in', () => {

    });

    then('student should be successfully logged in', () => {

    });
  });
})








