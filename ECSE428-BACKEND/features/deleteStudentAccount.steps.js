const { defineFeature, loadFeature } = require("jest-cucumber")
const app = require("../app");
const supertest = require("supertest");
const req = supertest(app)
const { User } = require('./../models/user')

const feature = loadFeature(
  "./features/ID003_Delete_Student_Account.feature"
);

let responseMessage = "";
let responseStatus = "";

defineFeature(feature, (test) => {
  test('Successfully Delete Student Account (Normal Flow)', ({ given, when, then, and }) => {
    given(/^student with (.*) and (.*) exists and is logged in$/, async (username, password) => {
      const user = await req.post("/createAccount").send({ username, password });
      const res = await req.post("/login").send({ username, password });
      console.log(res.body.message)
      expect(res.statusCode).toBe(200);
    });

    when(/^the student (.*) deletes their account$/, async (username) => {
      const res = await req.post("/deleteAccount").send({ username });
      responseStatus = res.statusCode;
      responseMessage = res.body.message;

      console.log(responseStatus)
    });

    then(/^the student account with the username (.*) will be deleted from the system$/, async (username) => {
      var usr = await User.findOne({ username });
      expect(usr).toBe(null)
    });

    and('the user should logged out', async () => {
      const res = await req.get("/").send();
      const loggedIn = res.statusCode;
      expect(loggedIn).toBe(false);
    });
  });
})








