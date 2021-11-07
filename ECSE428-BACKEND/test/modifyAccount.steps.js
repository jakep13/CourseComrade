const { defineFeature, loadFeature } = require("jest-cucumber")
const app = require("../app");
const supertest = require("supertest");
const req = supertest(app)
const { User } = require('../models/user')
const { Course } = require('../models/course')

const feature = loadFeature(
  "./test/features/ID004_Modify_Account_Details.feature"
);


defineFeature(feature, (test) => {
  let cookies;
  let responseMessage = "";
  let responseStatus = "";

  afterEach(() => {
    cookies = null;
    responseMessage = "";
    responseStatus = "";
  });

  test('Attempt to modify account details with valid credentials (Normal Flow)', ({ given, and, when, then }) => {
    given(/^student (.*) is logged in to CourseComrade$/, (arg0) => {
      pending();
    });

    and(/^student (.*) has password (.*) and username (.*)$/, (arg0, arg1, arg2) => {
      pending();
    });

    and(/^student (.*) provides new credentials (.*) and (.*)$/, (arg0, arg1, arg2) => {
      pending();
    });

    when(/^student (.*) requests to modify account details$/, (arg0) => {
      pending();
    });

    and(/^student (.*) provides valid credentials (.*) and (.*)$/, (arg0, arg1, arg2) => {
      pending();
    });

    then(/^account details (.*) and (.*) shall be updated to (.*) and (.*)$/, (arg0, arg1, arg2, arg3) => {
      pending();
    });
  });

  test('Attempt to modify account details with an existing username (Error Flow)', ({ given, and, when, then }) => {
    given(/^student (.*) is logged in to CourseComrade$/, (arg0) => {
      pending();
    });

    and(/^student (.*) has password (.*) and username (.*)$/, (arg0, arg1, arg2) => {
      pending();
    });

    and(/^student (.*) provides new credentials (.*) and (.*)$/, (arg0, arg1, arg2) => {
      pending();
    });

    when(/^student (.*) requests to modify account details$/, (arg0) => {
      pending();
    });

    and(/^username (.*) already exists in the system$/, (arg0) => {
      pending();
    });

    and(/^student (.*) provides a new username (.*) and a new password (.*)$/, (arg0, arg1, arg2) => {
      pending();
    });

    then(/^no change shall occur to account belonging to (.*)$/, (arg0) => {
      pending();
    });

    and(/^the error message "(.*)" is issued$/, (arg0) => {
      pending();
    });
  });

  test('Attempt to modify account details with invalid credentials (Error Flow)', ({ given, and, when, then }) => {
    given(/^student (.*) is logged in to CourseComrade$/, (arg0) => {
      pending();
    });

    and(/^student (.*) has password (.*) and username (.*)$/, (arg0, arg1, arg2) => {
      pending();
    });

    and(/^student (.*) provides new credentials (.*) and (.*)$/, (arg0, arg1, arg2) => {
      pending();
    });

    when(/^student (.*) requests to modify account details$/, (arg0) => {
      pending();
    });

    and(/^student (.*) provides invalid credentials (.*) and (.*)$/, (arg0, arg1, arg2) => {
      pending();
    });

    then(/^no change shall occur to account belonging to (.*)$/, (arg0) => {
      pending();
    });

    and(/^the error message "(.*)" is issued$/, (arg0) => {
      pending();
    });
  });

});