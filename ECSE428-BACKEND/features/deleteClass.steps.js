const { defineFeature, loadFeature } = require("jest-cucumber")
const app = require("../app");
const supertest = require("supertest");
const req = supertest(app)

const feature = loadFeature(
  "./features/ID011_Delete_Class.feature"
);

let responseMessage = "";
let responseStatus = "";

defineFeature(feature, (test) => {
  test('Delete Class From Student Account (Normal Flow)', ({ given, and, when, then }) => {
    given(/^student "(.*)" is logged in$/, (arg0) => {

    });

    and('the student is registered to the following courses:', (table) => {

    });

    when(/^the student request to remove the course "(.*)" from their profile$/, (arg0) => {

    });

    then('the student is registered to the following courses:', (table) => {

    });
  });

  test('Delete Unregistered Class From Student Account (Error Flow)', ({ given, and, when, then }) => {
    given(/^student "(.*)" is logged in$/, (arg0) => {

    });

    and('the student is registered to the following courses:', (table) => {

    });

    when(/^the student request to remove the unregistered course "(.*)" from their profile$/, (arg0) => {

    });

    then(/^"(.*)" error message is issued$/, (arg0) => {

    });

    and('the student is registered to the following courses:', (table) => {

    });
  });
})








