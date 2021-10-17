const { defineFeature, loadFeature } = require("jest-cucumber")
const app = require("../app");
const supertest = require("supertest");
const req = supertest(app)

const feature = loadFeature(
  "./features/ID010_Add_Class_to_User_Profile.feature"
);

let responseMessage = "";
let responseStatus = "";

var cookies;

defineFeature(feature, (test) => {
    let registered = false;
  
    afterEach(() => {
      registered = false;
    });

    test('Register class to student profile (Normal Flow)', ({ given, when, then }) => {
    	given(/^student (.*) is logged in to CourseComrade account$/, async (username) => {
            const password = "pass123"
            const user = await req.post("/createAccount").send({ username, password });
            const login_res = await req.post("/login").send({ username, password });
            cookies = login_res.headers['set-cookie']
            expect(login_res.statusCode).toBe(200);
    	});

    	when(/^student (.*) registers for class (.*) on CourseComrade$/, async (username, course) => {
            const registration_res = await req.post("/addCourse").set('cookie', cookies).send({course});
            responseStatus = registration_res.statusCode;
            responseMessage = registration_res.body.message;
            registered = (responseStatus == 200)
    	});

    	then(/^(.*) should be added to student (.*) profile$/, () => {
            expect(registered).toBe(true);
    	});
    });
    

    test('Attempt to register for an invalid course (Error Flow)', ({ given, when, then }) => {
    	given(/^student (.*) is logged in to CourseComrade account$/, async (username) => {
            const password = "pass123"
            const user = await req.post("/createAccount").send({ username, password });
            const login_res = await req.post("/login").send({ username, password });
            cookies = login_res.headers['set-cookie']
            expect(login_res.statusCode).toBe(200);
    	});

    	when(/^student (.*) registers for an invalid class (.*) on CourseComrade$/, async (username, course) => {
            const registration_res = await req.post("/addCourse").set('cookie', cookies).send({course});
            responseStatus = registration_res.statusCode;
            responseMessage = registration_res.body.message;
            registered = (responseStatus != 402)
    	});

    	then(/^a resulting "(.*)" error message is issued$/, () => {
            expect(registered).toBe(false)
    	});
    });

})