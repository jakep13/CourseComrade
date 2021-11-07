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
    given(/^student (.*) with password (.*) is logged in to CourseComrade$/, async (username, password) => {
      const user = await req.post("/createAccount").send({ username, password, verif_password: password });
      const res = await req.post("/login").send({ username, password });
      cookies = res.headers['set-cookie']
      expect(res.statusCode).toBe(200);
    });

    when(/^student (.*) requests to modify account details to (.*) and (.*)$/, async (username, newUsername, newPassword) => {
      const res = await req.put("/modifyAccount").set('cookie', cookies).send({ username: newUsername, password: newPassword });
      responseStatus = res.statusCode;
      responseMessage = res.body.message;
    });

    then(/^account details (.*) and (.*) shall be updated to (.*) and (.*)$/, async (oldUsername, oldPassword, username, password) => {
      const user = await User.findOne({ username });
      expect(responseStatus).toBe(200);
      expect(user.username).toBe(username);
      expect(user.password).toBe(password);
    });
  });

  test('Attempt to modify account details with an existing username (Error Flow)', ({ given, and, when, then }) => {
    given(/^student (.*) with password (.*) is logged in to CourseComrade$/, async (username, password) => {
      const user = await req.post("/createAccount").send({ username, password, verif_password: password });
      const res = await req.post("/login").send({ username, password });
      cookies = res.headers['set-cookie']
      expect(res.statusCode).toBe(200);
    });

    given(/^student (.*) already exists in the system$/, async (username) => {
      const password = "pass123";
      const res = await req.post("/createAccount").send({ username, password, verif_password: password });
      expect(res.statusCode).toBe(200);
    });

    when(/^student (.*) requests to modify account details to (.*) and (.*)$/, async (username, newUsername, newPassword) => {
      const res = await req.put("/modifyAccount").set('cookie', cookies).send({ username: newUsername, password: newPassword });
      responseStatus = res.statusCode;
      responseMessage = res.body.message;
    });

    then(/^no change shall occur to account belonging to (.*) and (.*)$/, async (username, password) => {
      const user = await User.findOne({ username });
      expect(user.username).toBe(username);
      expect(user.password).toBe(password);
    });

    and(/^the error message "(.*)" is issued$/, (error) => {
      expect(responseStatus).not.toBe(200);
      expect(responseMessage).toBe(error);
    });
  });

  test('Attempt to modify account details with invalid credentials (Error Flow)', ({ given, and, when, then }) => {
    given(/^student (.*) with password (.*) is logged in to CourseComrade$/, async (username, password) => {
      const user = await req.post("/createAccount").send({ username, password, verif_password: password });
      const res = await req.post("/login").send({ username, password });
      cookies = res.headers['set-cookie']
      expect(res.statusCode).toBe(200);
    });

    when(/^student (.*) requests to modify account details to (.*) and (.*)$/, async (username, newUsername, newPassword) => {
      const res = await req.put("/modifyAccount").set('cookie', cookies).send({ username: newUsername, password: newPassword });
      responseStatus = res.statusCode;
      responseMessage = res.body.error;
    });

    then(/^no change shall occur to account belonging to (.*) and (.*)$/, async (username, password) => {
      const user = await User.findOne({ username });
      expect(user.username).toBe(username);
      expect(user.password).toBe(password);
    });

    and(/^the error message "(.*)" is issued$/, (error) => {
      expect(responseStatus).not.toBe(200);
      expect(responseMessage).toBe(error);
    });
  });
});