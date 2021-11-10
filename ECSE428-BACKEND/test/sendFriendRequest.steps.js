const { defineFeature, loadFeature } = require("jest-cucumber")
const supertest = require("supertest");
const app = require("../app");
const { User } = require('../models/user')
const { Course } = require('../models/course')

const req = supertest(app)

const feature = loadFeature(
  "./test/features/ID005_Send_Friend_Request.feature"
);

const password = "pass123";

function existsWithStatus(friends, username, status) {
  let exists = false
  friends.forEach(f => {
    if (status != null) {
      exists = exists || (f.friend.username === username && f.status === status);
    } else {
      exists = exists || (f.friend.username === username);
    }
  });
  return exists;
}

defineFeature(feature, (test) => {
  let cookies;
  let responseMessage = "";
  let responseStatus = "";
  let addedUsername = "";

  afterEach(() => {
    responseMessage = "";
    responseStatus = "";
    addedUsername = "";
  });

  test('Request to add fellow student to personal network (Normal Flow)', ({ given, and, when, then }) => {
    given('students exists in the system:', async (table) => {
      table.forEach(async (e) => {
        const user = await req.post("/createAccount").send({
          username: e.username,
          password: password,
          verif_password: password
        });
      });
    });

    and(/^student "(.*)" is logged in to CourseComrade account$/, async (username) => {
      const login_res = await req.post("/login").send({ username, password });
      cookies = login_res.headers['set-cookie']
      expect(login_res.statusCode).toBe(200);
    });

    when(/^student "(.*)" requests to add user (.*) to their personal network$/, async (username1, username2) => {
      const friendReq_res = await req.post("/addFriend").set('cookie', cookies).send({ username: username2 });
      responseStatus = friendReq_res.statusCode;
      responseMessage = friendReq_res.body.message;
    });

    then(/^"(.*)" should have sent a request to (.*)$/, async (username1, username2) => {
      const friends_res = await req.get("/friends").set('cookie', cookies).send();
      expect(friends_res.statusCode).toBe(200);
      expect(existsWithStatus(friends_res.body, username2, "requested")).toBe(true);
    });

    and(/^(.*) should have a pending friend request from "(.*)"$/, async (username1, username2) => {
      // login to other student account
      const login_res = await req.post("/login").send({ username: username1, password });
      cookies = login_res.headers['set-cookie']
      expect(login_res.statusCode).toBe(200);

      const friends_res = await req.get("/friends").set('cookie', cookies).send();
      expect(friends_res.statusCode).toBe(200);
      expect(existsWithStatus(friends_res.body, username2, "pending")).toBe(true);
    });
  });

  test('Request to add non-existent student to personal network (Error Flow)', ({ given, and, when, then }) => {
    given('students exists in the system:', async (table) => {
      table.forEach(async (e) => {
        const user = await req.post("/createAccount").send({
          username: e.username,
          password: password,
          verif_password: password
        });
      });
    });

    and(/^student "(.*)" is logged in to CourseComrade account$/, async (username) => {
      const login_res = await req.post("/login").send({ username, password });
      cookies = login_res.headers['set-cookie']
      expect(login_res.statusCode).toBe(200);
    });

    when(/^student "(.*)" requests to add non-existant user (.*) to their personal network$/, async (username1, username2) => {
      addedUsername = username2;
      const friendReq_res = await req.post("/addFriend").set('cookie', cookies).send({ username: username2 });
      responseStatus = friendReq_res.statusCode;
      responseMessage = friendReq_res.body.message;
    });

    then('no change to any personal network will occur', async () => {
      const friends_res = await req.get("/friends").set('cookie', cookies).send();
      expect(friends_res.statusCode).toBe(200);
      expect(existsWithStatus(friends_res.body, addedUsername, null)).toBe(false);
    });

    and(/^the error message "(.*)" is issued$/, (error) => {
      expect(responseMessage).toBe(error);
    });
  });

});
