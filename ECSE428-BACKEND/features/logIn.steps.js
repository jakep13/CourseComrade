const { defineFeature, loadFeature } = require("jest-cucumber")
const app = require("../app");
const supertest = require("supertest");
const req = supertest(app)

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
      const user = await req.post("/createAccount").send({ username, password });
      console.log("\n\n\n\n\n\n\n FUCKING PLEASE \n\n\n\n\n");
    });

    when(/^student enters a wrong username (.*) and student enters valid password (.*)$/, async (input_username, password) => {
      const res = await req.post("/login").send({
        username: input_username,
        password
      });
      responseStatus = res.statusCode;
      // responseMessage = res.;

      loggedIn = true;
    });

    then('student should not be logged in', () => {
      expect(true).toBe(false);
    });

    and(/^student should see the error message "(.*)"$/, (arg0) => {
      expect(true).toBe(false);
    });
  });


  test('Attempt to log in with invalid password (Error Flow)', ({ given, when, and, then }) => {
    given(/^a student account with (.*) and (.*) exists$/, (arg0, arg1) => {
      pending();
    });

    when(/^student enters valid username (.*)$/, (arg0) => {
      pending();
    });

    and(/^student enters a wrong password (.*)$/, (arg0) => {
      pending();
    });

    and('student requests to log in', () => {
      pending();
    });

    then('student should be not be logged in', () => {
      pending();
    });

    and(/^student should see the error message "(.*)"$/, (arg0) => {
      pending();
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








