const { defineFeature, loadFeature } = require("jest-cucumber")
const app = require("../app");
const supertest = require("supertest");
const req = supertest(app)
const { User } = require('./../models/user')
const { Course } = require('./../models/course')

const feature = loadFeature(
  "./features/ID011_Delete_Class.feature"
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

  test('Delete Class From Student Account (Normal Flow)', ({ given, and, when, then }) => {
    given(/^student "(.*)" is logged in$/, async (username) => {
      mainUsername = username;
      const password = "helloDude21"
      const user = await req.post("/createAccount").send({ username, password, verif_password: password });
      const res = await req.post("/login").send({ username, password });
      cookies = res.headers['set-cookie']
      expect(res.statusCode).toBe(200);
    });

    and(/^the student is registered to "(.*)" - "(.*)"$/, async (course, name) => {
      const res = await req.post("/addCourse").set('cookie', cookies).send({ course, name });
      expect(res.statusCode).toBe(200);
    });

    when(/^the student request to remove the course "(.*)" from their profile$/, async (course) => {
      const res = await req.post("/removeCourse").set('cookie', cookies).send({ course });
      responseStatus = res.statusCode;
      responseMessage = res.body.message;
    });

    then('the student is registered to no courses', async () => {
      const coursesRes = await req.get("/courses").set('cookie', cookies).send();
      const courses = coursesRes.body.courses;

      expect(courses.length).toBe(0);
    });
  });

  test('Delete Unregistered Class From Student Account (Error Flow)', ({ given, and, when, then }) => {
    given(/^student "(.*)" is logged in$/, async (username) => {
      mainUsername = username;
      const password = "helloDude21"
      const user = await req.post("/createAccount").send({ username, password, verif_password: password });
      const res = await req.post("/login").send({ username, password });
      cookies = res.headers['set-cookie']
      expect(res.statusCode).toBe(200);
    });

    and(/^the student is registered to "(.*)" - "(.*)"$/, async (course, name) => {
      const res = await req.post("/addCourse").set('cookie', cookies).send({ course, name });
      expect(res.statusCode).toBe(200);
    });

    when(/^the student request to remove the unregistered course "(.*)" from their profile$/, async (course) => {
      const res = await req.post("/removeCourse").set('cookie', cookies).send({ course });
      responseStatus = res.statusCode;
      responseMessage = res.body.message;
    });

    then(/^"(.*)" error message is issued$/, (errorMsg) => {
      expect(responseMessage).toBe(errorMsg)
    });

    and(/^the student is registered to "(.*)"$/, async (course) => {
      const coursesRes = await req.get("/courses").set('cookie', cookies).send();
      const courses = coursesRes.body.courses;
      const courseCodes = courses.map(course => course.code);

      expect(courses.length).toBe(1);
      expect(courseCodes.includes(course)).toBe(true);
    });
  });
})








