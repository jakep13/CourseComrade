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
  let mainUsername = "";
  let responseMessage = "";
  let responseStatus = "";

  afterEach(() => {
    responseMessage = "";
    responseStatus = "";
    mainUsername = "";
  });

  test('Delete Class From Student Account (Normal Flow)', ({ given, and, when, then }) => {
    given(/^student "(.*)" is logged in$/, async (username) => {
      mainUsername = username;
      const password = "helloDude21"
      const user = await req.post("/createAccount").send({ username, password });
      const res = await req.post("/login").send({ username, password });
      expect(res.statusCode).toBe(200);
    });

    and('the student is registered to the following courses:', async (table) => {
      table.forEach(async (row) => {
        const res = await req.post("/addCourse").send({
          code: row.course,
          name: row.course_name,
        });
      });
    });

    when(/^the student request to remove the course "(.*)" from their profile$/, async (courseCode) => {
      const res = await req.post("/addCourse").send({
        code: courseCode,
      });
      responseStatus = res.statusCode;
      responseMessage = res.body.message;
    });

    then(/^the student is no longer registered to the course "(.*)"$/, async (courseCode) => {
      var user = await User.findOne({ mainUsername });

      console.log(user)
    });
  });

  test('Delete Unregistered Class From Student Account (Error Flow)', ({ given, and, when, then }) => {
    given(/^student "(.*)" is logged in$/, async (username) => {
      mainUsername = username;
      const password = "helloDude21"
      const user = await req.post("/createAccount").send({ username, password });
      const res = await req.post("/login").send({ username, password });
      expect(res.statusCode).toBe(200);
    });

    and('the student is registered to the following courses:', async (table) => {
      table.forEach(async (row) => {
        const res = await req.post("/addCourse").send({
          code: row.course,
          name: row.course_name,
        });
      });
    });

    when(/^the student request to remove the unregistered course "(.*)" from their profile$/, async (courseCode) => {
      const res = await req.post("/addCourse").send({
        code: courseCode,
      });
      responseStatus = res.statusCode;
      responseMessage = res.body.message;
    });

    then(/^"(.*)" error message is issued$/, (errorMsg) => {
      expect(responseMessage).toBe(errorMsg)
    });

    and('the student is registered to the following courses:', async (table) => {
      const courses = await req.get("/userCourses").send();

      table.forEach((row) => {
        let found = false;
        courses.body.courses.forEach((course) => {
          found = found || course.code === row.course;
        });
        expect(found).toBe(true);
      });
    });
  });
})








