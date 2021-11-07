const { defineFeature, loadFeature } = require("jest-cucumber")
const supertest = require("supertest");
const app = require("../app");
const { User } = require('../models/user')
const { Course } = require('../models/course')

const req = supertest(app)

const feature = loadFeature(
  "./features/ID012_Search_For_Student.feature"
);

const password = "pass123";

defineFeature(feature, (test) => {
    let responseMessage = "";
    let responseStatus = "";
  
    afterEach(() => {
      responseMessage = "";
      responseStatus = "";
    });
    test('Search an existing user (Normal Flow)', ({ given, and, when, then }) => {
        given(/^student (.*) is logged in to CourseComrade account$/, async(username) =>{
            const user = await req.post("/createAccount").send({ username, password, verif_password: password });
            const res = await req.post("/login").send({ username, password });
            cookies = res.headers['set-cookie']
            expect(res.statusCode).toBe(200);
        });

        and(/^student (.*) exists in the system$/, async(username2) => {
            const user2 = await req.post("/createAccount").send({
                username2,
                password,
                verif_password: password
            });
        });

        when(/^student (.*) searches for user (.*) on CourseComrade$/, async(username1, username2) => {
            const res = await req.get("/user").set('cookie', cookies).send({ username2 });
            responseStatus = res.statusCode;
            responseMessage = res.body.message;
        });

        then(/^(.*) should be shown to (.*)$/, async(username2, username1) => {
            expect(responseStatus).toBe(200);
        });
    });

    test('Request to add non-existant student to personal network (Error Flow)', ({ given, and, when, then }) => {
        given(/^student (.*) is logged in to CourseComrade account$/, async(username) => {
            const user = await req.post("/createAccount").send({ username, password, verif_password: password });
            const res = await req.post("/login").send({ username, password });
            cookies = res.headers['set-cookie']
            expect(res.statusCode).toBe(200);
        });

        and(/^student (.*) exists in the system$/, async(username2) => {
            const user2 = await req.post("/createAccount").send({
                username: username2,
                password: password,
                verif_password: password
            });
        });   

        when(/^student (.*) searches for non-existant user (.*) on CourseComrade$/, async(username1, username2) => {
            const res = await req.get("/user").set('cookie', cookies).send({ username2 });
            responseStatus = res.statusCode;
            responseMessage = res.body.message;
        });

        then(/^the error message "(.*)" is issued$/, (errorMsg) => {
            expect(responseMessage).toBe(errorMsg);
        });
    });
})