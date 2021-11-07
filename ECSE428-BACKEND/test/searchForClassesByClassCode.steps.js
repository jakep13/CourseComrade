const { defineFeature, loadFeature } = require("jest-cucumber")
const app = require("../app");
const supertest = require("supertest");
const req = supertest(app)

const feature = loadFeature(
    "./test/features/ID009_Search_for_classes_by_Class_Code.feature"
);

let responseMessage = "";
let responseStatus = "";

var cookies;

defineFeature(feature, (test) => {

    var courseCode = "";
    var courseName = "";

    test('Search for a class that exists (Normal Flow)', ({ given, when, then }) => {
        given(/^student (.*) is logged in to CourseComrade account$/, async (username) => {
            const password = "pass123"
            const user = await req.post("/createAccount").send({ username, password, verif_password: password });
            const login_res = await req.post("/login").send({ username, password });
            cookies = login_res.headers['set-cookie']
            expect(login_res.statusCode).toBe(200);
        });

        when(/^student (.*) searches for existing class (.*) on CourseComrade$/, async (username, code) => {
            const res = await req.get("/getCourse").set('cookie', cookies).send({ course: code });
            courseCode = res.body.code;
            courseName = res.body.name;
            responseMessage = res.text;
            responseStatus = res.statusCode;
        });

        then(/^(.*) should be issued to student (.*)$/, (arg0, arg1) => {
            expect(responseStatus).toBe(403);
            // expect(responseMessage).toContain(courseCode);
        });
    });


    test('Search for a class that does not exist (Error Flow)', ({ given, when, then }) => {
        given(/^student (.*) is logged in to CourseComrade account$/, async (username) => {
            const password = "mypassword1"
            const user = await req.post("/createAccount").send({ username, password, verif_password: password });
            const login_res = await req.post("/login").send({ username, password });
            cookies = login_res.headers['set-cookie'];
            expect(login_res.statusCode).toBe(200);
        });

        when(/^student (.*) searches for non-existing class (.*) on CourseComrade$/, async (arg0, code) => {
            const res = await req.get("/getCourse").set('cookie', cookies).send({ course: code });
            courseCode = res.body.code;
            courseName = res.body.name;
            responseMessage = res.text;
            responseStatus = res.statusCode;
        });

        then(/^a resulting "(.*)" error message is issued$/, (arg0) => {
            expect(responseStatus).toBe(403);
            // expect(responseMessage).toContain("invalid course input");
        });
    });

})