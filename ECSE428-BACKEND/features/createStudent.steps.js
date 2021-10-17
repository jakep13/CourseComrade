const { defineFeature, loadFeature } = require("jest-cucumber")
const supertest = require("supertest");
const app = require("../app");
const { User } = require('./../models/user')
const { Course } = require('./../models/course')

const req = supertest(app)

const feature = loadFeature(
  "./features/Create-Student-Account.feature"
);


defineFeature(feature, (test) => {
  let cookies;
  let mainUsername = "";
  let responseMessage = "";
  let responseStatus = "";

  afterEach(() => {
    cookies = null;
    responseMessage = "";
    responseStatus = "";
    mainUsername = "";
  });

  test('Create Student Account (Normal Flow)', ({ when, then }) => {
    when(/^the student (.*) wants to create an account with CourseComrade with the password (.*) which matches the verification password (.*) and consists of at least six characters of which at least one is a digit and letter.$/, async (username, password, verif_password) => {
      const res = await req.post("/createAccount").send({ username, password, verif_password });
      responseStatus = res.statusCode;
      responseMessage = res.body.message;
      console.log(responseMessage)
    });

    then(/^a new student account will be created with the username (.*)$/, async (arg0) => {
      var usr = await User.findOne({ username: arg0 });
      expect(usr).not.toBe(null)
    });

    then(/^a new user with username (.*) will be populated into the system with the given password (.*)$/, async (arg0, arg1) => {
      var usr = await User.findOne({ username: arg0, password: arg1 });
      expect(usr).not.toBe(null)
    });
  });

  test('Attempt to Create a student account with invalid Password format (Error Flow)', ({ when, then }) => {
    when(/^the student (.*) wants to create an account with the password (.*) and a matching verification password (.*)$/, async (username, password, verif_password) => {
      const res = await req.post("/createAccount").send({ username, password, verif_password });
      responseStatus = res.statusCode;
      responseMessage = res.body.message;
    });

    then(/^a resulting "(.*)" message is issued$/, (errorMsg) => {
      expect(responseMessage).toBe(errorMsg)
    });
  });

  test('Attempt to Create a student account with password which doesn\'t match the verification password (Error Flow)', ({ when, then }) => {
    when(/^the student (.*) wants to create an account with the password (.*) and a non-matching verification password (.*)$/, async (username, password, verif_password) => {
      const res = await req.post("/createAccount").send({ username, password, verif_password });
      responseStatus = res.statusCode;
      responseMessage = res.body.message;
    });

    then(/^a resulting "(.*)" message is issued$/, (errorMsg) => {
      expect(responseMessage).toBe(errorMsg)
    });
  });

  test('Attempt to create a student account with a username which is already associated with an existing account (Error Flow)', ({ given, when, then }) => {
    given(/^student with username (.*) and password (.*) exists$/, async (username, password) => {
      const res = await req.post("/createAccount").send({ username, password, verif_password: password });
    });

    when(/^a student with username (.*) tries to register an account with a password (.*) and a matching verification password (.*)$/, async (username, password, verif_password) => {
      const res = await req.post("/createAccount").send({ username, password, verif_password });
      responseStatus = res.statusCode;
      responseMessage = res.body.message;
    });

    then(/^a resulting "(.*)" message is issued$/, (errorMsg) => {
      expect(responseMessage).toBe(errorMsg)
    });
  });
});
