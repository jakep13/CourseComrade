const { defineFeature, loadFeature } = require("jest-cucumber")
const app = require("../app");
const supertest = require("supertest");
const { assert } = require("console");
const req = supertest(app)

const feature = loadFeature(
  "./features/ID015_View_Personal_Classes.feature"
);

let responseMessage = "";
let responseStatus = "";

var cookies;

defineFeature(feature, (test) => {
    test('View list of personal registered classes (Normal Flow)', ({ given, and, when, then }) => {

        var registered_courses;
        var verify_registered_courses = [];

        given(/^student "(.*)" is logged in$/, async (username) => {
            const password = "pass123"
            const user = await req.post("/createAccount").send({ username, password, verif_password: password });
            const login_res = await req.post("/login").send({ username, password });
            cookies = login_res.headers['set-cookie']
            expect(login_res.statusCode).toBe(200);
        });

        and('the student is registered to the following courses:', async (table) => {
            // cleaning up previous courses
            registered_courses = await req.get("/courses").set('cookie', cookies);
            registered_courses.body['courses'].forEach(async (course) => {
                await req.post("/removeCourse").set('cookie', cookies).send({
                  course: course.code,
                });
            });

            for (const c of table) {
                await req.post("/addCourse").set('cookie', cookies).send({
                  course: c.course,
                  name: c.course_name,
                });
                verify_registered_courses.push(c.course);
            }
        });

        when('the student requests to view their classes', async () => {
            registered_courses = await req.get("/courses").set('cookie', cookies);
        });
        
        then('the following list of classes is generated:', () => {
            var registered_courses_cleaned = [];
            registered_courses.body['courses'].forEach(function(course) {
                registered_courses_cleaned.push(course.code);
            });
            expect(registered_courses_cleaned.sort()).toStrictEqual(verify_registered_courses.sort());
        }); 
        
    });


    test('Confirm list of personal registered classes after removing a class (Alternate Flow)', ({ given, and, when, then }) => {
    	var registered_courses;
        var verify_registered_courses = [];

        given(/^student "(.*)" is logged into the CourseComrade$/, async (username) => {
            const password = "pass123"
            const user = await req.post("/createAccount").send({ username, password, verif_password: password });
            const login_res = await req.post("/login").send({ username, password });
            cookies = login_res.headers['set-cookie']
            expect(login_res.statusCode).toBe(200);
        });

        and('the student is registered to the following courses:', async (table) => {
            // cleaning up previous courses
            registered_courses = await req.get("/courses").set('cookie', cookies);
            registered_courses.body['courses'].forEach(async (course) => {
                await req.post("/removeCourse").set('cookie', cookies).send({
                  course: course.code,
                });
            });

            for (const c of table) {
                await req.post("/addCourse").set('cookie', cookies).send({
                  course: c.course,
                  name: c.course_name,
                });
            }
        });

    	and(/^course "(.*)" is removed$/, async (course) => {
            await req.post("/removeCourse").set('cookie', cookies).send({
                course: course
            });
    	});

    	when('the student requests to view their classes', async () => {
            registered_courses = await req.get("/courses").set('cookie', cookies);
    	});

    	then('the following list of classes is generated:', (table) => {
            table.forEach( (c) => {
                verify_registered_courses.push(c.course);
            });
            
            var registered_courses_cleaned = [];
            registered_courses.body['courses'].forEach(function(course) {
                registered_courses_cleaned.push(course.code);
            });
            expect(registered_courses_cleaned.sort()).toStrictEqual(verify_registered_courses.sort());
    	});
    });


    test('Attempt to view personal registered classes when no classes are registered (Error Flow)', ({ given, and, when, then }) => {
    	given(/^student "(.*)" is logged in$/, (arg0) => {

    	});

    	and('the student is not registered to any courses', () => {

    	});

    	when('the student requests to view their classes', () => {

    	});

    	then(/^a resulting "(.*)" message is issued$/, (arg0) => {

    	});
    });

});
