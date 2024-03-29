const { defineFeature, loadFeature } = require("jest-cucumber")
const app = require("../app");
const supertest = require("supertest");
const req = supertest(app)
const { User } = require('./../models/user')

const feature = loadFeature(
  "./test/features/ID003_Delete_Student_Account.feature"
);

var cookies;

let responseMessage = "";
let responseStatus = "";

defineFeature(feature, (test) => {
  test('Successfully Delete Student Account (Normal Flow)', ({ given, when, then, and }) => {
    given(/^student with (.*) and (.*) exists and is logged in$/, async (username, password) => {
      const user = await req.post("/createAccount").send({ username, password, verif_password: password });
      const res = await req.post("/login").send({ username, password });
      cookies = res.headers['set-cookie']
      expect(res.statusCode).toBe(200);
    });

    when(/^the student (.*) deletes their account$/, async (username) => {
      const res = await req.post("/deleteAccount").set('cookie', cookies).send();
      responseMessage = res.body.message;
    });

    then(/^the student account with the username (.*) will be deleted from the system$/, async (username) => {
      var usr = await User.findOne({ username });
      expect(usr).toBe(null)
    });

    and('the user should logged out', async () => {
      const res = await req.get("/").send();
      const loggedIn = res.statusCode;
      expect(loggedIn).toBe(400);
    });
  });
})









